import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "../components/ui/modal";
import EventForm from "../components/EventForm";
import EventDeleteConfirmation from "../components/EventDeleteConfirmation";

type Event = {
  _id: string;
  nome: string;
  dataEvento: string;
  inicioInscricoes: string;
  fimInscricoes: string;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/eventos`
      );
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const handleEventAdded = () => {
    fetchEvents();
    setIsAddModalOpen(false);
  };

  const handleEventUpdated = () => {
    fetchEvents();
    setIsEditModalOpen(false);
  };

  const handleEventDeleted = () => {
    fetchEvents();
    setIsDeleteModalOpen(false);
  };

  // Function to format date correctly
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Events</h1>
        <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <ModalTrigger asChild>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-400 transition-all">
              Add Event
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add New Event</ModalTitle>
            </ModalHeader>
            <EventForm onSuccess={handleEventAdded} />
          </ModalContent>
        </Modal>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: Event) => (
          <div key={event._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{event.nome}</h2>
            <p className="text-gray-600">
              Date: {formatDate(event.dataEvento)}
            </p>
            <p className="text-gray-600">
              Registration: {formatDate(event.inicioInscricoes)} -{" "}
              {formatDate(event.fimInscricoes)}
            </p>
            <div className="mt-4 space-x-2">
              <Modal
                open={isEditModalOpen && selectedEvent?._id === event._id}
                onOpenChange={(open) => {
                  setIsEditModalOpen(open);
                  if (!open) setSelectedEvent(null);
                }}
              >
                <ModalTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Edit Event</ModalTitle>
                  </ModalHeader>
                  <EventForm
                    event={selectedEvent}
                    onSuccess={handleEventUpdated}
                  />
                </ModalContent>
              </Modal>
              <Modal
                open={isDeleteModalOpen && selectedEvent?._id === event._id}
                onOpenChange={(open) => {
                  setIsDeleteModalOpen(open);
                  if (!open) setSelectedEvent(null);
                }}
              >
                <ModalTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Delete Event</ModalTitle>
                  </ModalHeader>
                  <EventDeleteConfirmation
                    event={selectedEvent}
                    onSuccess={handleEventDeleted}
                    onClose={() => setIsDeleteModalOpen(false)}
                  />
                </ModalContent>
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
