import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

const schema = z.object({
  nome: z.string().min(1, { message: "Required" }),
  dataEvento: z.string().min(1, { message: "Required" }),
  inicioInscricoes: z.string().min(1, { message: "Required" }),
  fimInscricoes: z.string().min(1, { message: "Required" }),
});

type FormSchema = z.infer<typeof schema>;

export default function EventAdd() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await axios.post(
        "${import.meta.env.VITE_API_URL}/api/eventos",
        {
          nome: data.nome,
          dataEvento: data.dataEvento,
          inicioInscricoes: data.inicioInscricoes,
          fimInscricoes: data.fimInscricoes,
        }
      );
      navigate("/events");
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
          Add Event
        </h2>

        <div className="space-y-2">
          <Input
            placeholder="Event Name"
            {...register("nome")}
            className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
          />
          {errors.nome && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataEvento" className="text-black">
            Event Date
          </Label>
          <Input
            id="dataEvento"
            type="date"
            {...register("dataEvento")}
            className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
          />
          {errors.dataEvento && (
            <span className="text-red-500 text-sm">
              {errors.dataEvento.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="inicioInscricoes" className="text-black">
            Registration Start
          </Label>
          <Input
            id="inicioInscricoes"
            type="date"
            {...register("inicioInscricoes")}
            className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
          />
          {errors.inicioInscricoes && (
            <span className="text-red-500 text-sm">
              {errors.inicioInscricoes.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fimInscricoes" className="text-black">
            Registration End
          </Label>
          <Input
            id="fimInscricoes"
            type="date"
            {...register("fimInscricoes")}
            className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
          />
          {errors.fimInscricoes && (
            <span className="text-red-500 text-sm">
              {errors.fimInscricoes.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Send className="h-5 w-5" />
          <span>Add Event</span>
        </Button>
      </form>
    </div>
  );
}
