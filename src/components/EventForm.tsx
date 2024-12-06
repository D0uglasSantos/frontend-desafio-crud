import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { useEffect } from "react";
import { Label } from "./ui/label";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  dataEvento: z.string().min(1, { message: "Required" }),
  inicioInscricoes: z.string().min(1, { message: "Required" }),
  fimInscricoes: z.string().min(1, { message: "Required" }),
});

type FormSchema = z.infer<typeof schema>;

interface EventFormProps {
  event?: any;
  onSuccess: () => void;
}

export default function EventForm({ event, onSuccess }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (event) {
      reset({
        name: event.nome,
        dataEvento: new Date(event.dataEvento).toISOString().split("T")[0],
        inicioInscricoes: new Date(event.inicioInscricoes)
          .toISOString()
          .split("T")[0],
        fimInscricoes: new Date(event.fimInscricoes)
          .toISOString()
          .split("T")[0],
      });
    }
  }, [event, reset]);

  const onSubmit = async (data: FormSchema) => {
    try {
      if (event) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/eventos/${event._id}`, {
          nome: data.name,
          dataEvento: data.dataEvento,
          inicioInscricoes: data.inicioInscricoes,
          fimInscricoes: data.fimInscricoes,
        });
      } else {
        await axios.post("${import.meta.env.VITE_API_URL}/api/eventos", {
          nome: data.name,
          dataEvento: data.dataEvento,
          inicioInscricoes: data.inicioInscricoes,
          fimInscricoes: data.fimInscricoes,
        });
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          placeholder="Event Name"
          {...register("name")}
          className="w-full transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataEvento">Event Date</Label>
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
        <Label htmlFor="inicioInscricoes">Registration Start</Label>
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
        <Label htmlFor="fimInscricoes">Registration End</Label>
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
        <span>{event ? "Update" : "Add"} Event</span>
      </Button>
    </form>
  );
}
