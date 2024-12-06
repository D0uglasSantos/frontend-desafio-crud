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
import AthleteForm from "../components/AthleteForm";
import AthleteDeleteConfirmation from "../components/AthleteDeleteConfirmation";

export default function AthleteList() {
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/atletas");
      setAthletes(res.data);
    } catch (error) {
      console.error("Failed to fetch athletes", error);
    }
  };

  const handleAthleteAdded = () => {
    fetchAthletes();
    setIsAddModalOpen(false);
  };

  const handleAthleteUpdated = () => {
    fetchAthletes();
    setIsEditModalOpen(false);
  };

  const handleAthleteDeleted = () => {
    fetchAthletes();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Athletes</h1>
        <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <ModalTrigger asChild className="bg-indigo-600 text-white hover:bg-indigo-500 transition-all">
            <Button onClick={() => setIsAddModalOpen(true)}>Add Athlete</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add New Athlete</ModalTitle>
            </ModalHeader>
            <AthleteForm onSuccess={handleAthleteAdded} />
          </ModalContent>
        </Modal>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {athletes.map((athlete: any) => (
          <div key={athlete._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{athlete.nome}</h2>
            <p className="text-gray-600">CPF: {athlete.cpf}</p>
            <p className="text-gray-600">
              Vessels: {athlete.embarcacoes.length}
            </p>
            <div className="mt-4 space-x-2">
              <Modal open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <ModalTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAthlete(athlete);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Edit Athlete</ModalTitle>
                  </ModalHeader>
                  <AthleteForm
                    athlete={selectedAthlete}
                    onSuccess={handleAthleteUpdated}
                  />
                </ModalContent>
              </Modal>
              <Modal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
              >
                <ModalTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setSelectedAthlete(athlete);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Delete Athlete</ModalTitle>
                  </ModalHeader>
                  <AthleteDeleteConfirmation
                    athlete={selectedAthlete}
                    onSuccess={handleAthleteDeleted}
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
