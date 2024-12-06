import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

interface EventDeleteConfirmationProps {
  event: any;
  onSuccess: () => void;
  onClose: () => void;
}

export default function EventDeleteConfirmation({
  event,
  onSuccess,
  onClose,
}: EventDeleteConfirmationProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/eventos/${event._id}`
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center">
        Are you sure you want to delete the event {event.nome}?
      </p>
      <div className="flex justify-center space-x-4">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
