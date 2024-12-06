import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusCircle, Send, Trash2 } from "lucide-react";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  cpf: z.string().min(14, { message: "Required" }),
  vessels: z
    .array(
      z.object({
        _id: z.string().optional(),
        vesselName: z.string().min(1, { message: "Required" }),
        vesselCode: z.string().min(1, { message: "Required" }),
      })
    )
    .min(1, { message: "At least one vessel is required" }),
});

type FormSchema = z.infer<typeof schema>;

interface AthleteFormProps {
  athlete?: any;
  onSuccess: () => void;
}

export default function AthleteForm({ athlete, onSuccess }: AthleteFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  useEffect(() => {
    if (athlete) {
      reset({
        name: athlete.nome,
        cpf: athlete.cpf,
        vessels: athlete.embarcacoes.map((v: any) => ({
          _id: v._id,
          vesselName: v.nome,
          vesselCode: v.codigo,
        })),
      });
    }
  }, [athlete, reset]);

  const onSubmit = async (data: FormSchema) => {
    try {
      if (athlete) {
        await axios.put(
          `https://backend-desafio-crud.onrender.com/api/atletas/${athlete._id}`,
          {
            nome: data.name,
            cpf: data.cpf,
            embarcacoes: data.vessels.map((vessel) => ({
              _id: vessel._id,
              nome: vessel.vesselName,
              codigo: vessel.vesselCode,
            })),
          }
        );
      } else {
        await axios.post(
          "https://backend-desafio-crud.onrender.com/api/atletas",
          {
            nome: data.name,
            cpf: data.cpf,
            embarcacoes: data.vessels.map((vessel) => ({
              nome: vessel.vesselName,
              codigo: vessel.vesselCode,
            })),
          }
        );
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="Vessel Code"
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
          <span>{athlete ? "Update" : "Submit"}</span>
        </Button>
      </div>
    </form>
  );
}
