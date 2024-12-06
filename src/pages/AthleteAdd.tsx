import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PlusCircle, Send, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  cpf: z.string().min(14, { message: "Required" }),
  vessels: z
    .array(
      z.object({
        vesselName: z.string().min(1, { message: "Required" }),
        vesselCode: z.string().min(1, { message: "Required" }),
      })
    )
    .min(1, { message: "At least one vessel is required" }),
});

type FormSchema = z.infer<typeof schema>;

export default function AthleteAdd() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      vessels: [{ vesselName: "", vesselCode: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vessels",
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await axios.post("${import.meta.env.VITE_API_URL}/api/atletas", {
        nome: data.name,
        cpf: data.cpf,
        embarcacoes: data.vessels.map((vessel) => ({
          nome: vessel.vesselName,
          codigo: vessel.vesselCode,
        })),
      });
      navigate("/athletes");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-lg p-8 space-y-6 w-full max-w-md transition-all duration-300 ease-in-out hover:shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Add Athlete
        </h2>

        <div className="space-y-2">
          <Input
            placeholder="Name"
            {...register("name")}
            className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Input
            placeholder="CPF"
            {...register("cpf")}
            className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
          />
          {errors.cpf && (
            <span className="text-red-500 text-sm">{errors.cpf.message}</span>
          )}
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 bg-gray-50 rounded-md space-y-2 animate-fadeIn"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-indigo-600">
                  Vessel {index + 1}
                </h3>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <Input
                placeholder="Vessel Name"
                {...register(`vessels.${index}.vesselName`)}
                className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
              />
              {errors.vessels?.[index]?.vesselName && (
                <span className="text-red-500 text-sm">
                  {errors.vessels[index]?.vesselName?.message}
                </span>
              )}
              <Input
                placeholder="Vessel code"
                {...register(`vessels.${index}.vesselCode`)}
                className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
              />
              {errors.vessels?.[index]?.vesselCode && (
                <span className="text-red-500 text-sm">
                  {errors.vessels[index]?.vesselCode?.message}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => append({ vesselName: "", vesselCode: "" })}
            className="bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-200 flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Vessel</span>
          </Button>

          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 flex items-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
