import { FC, useState } from "react";
import { Button } from "../ui/button";
import { inputFields } from "./FormeAddBirth";
import InputField from "../ui/Tools/InputField";
import { newBirthVoid } from "../../../data/DataVoid";
import { BirthCerticat } from "../../../data/typeData";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addBirth } from "../../../redux/features/birthAct";

interface PropsAddBirth {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const AddBirth: FC<PropsAddBirth> = ({ dialogOpen, setDialogOpen }) => {
  const [newBirth, setNewBirth] = useState<BirthCerticat>(newBirthVoid);
  const dispatch = useDispatch();
  const birthCount = useSelector((state: any) => state.birthAct.births.length);

  if (!dialogOpen) return null;

  const handleCreate = () => {
    const registrationNumber = `AC-${new Date().getFullYear()}-${Date.now()}-${(birthCount + 1).toString().padStart(3, '0')}`;

    const newBirthRecord: BirthCerticat = {
      ...newBirth,
      id: uuid(),
      registrationNumber,
      requestDate: new Date().toISOString().split("T")[0],
      status: "EN_ATTENTE",
      createdAt: new Date().toISOString(),
    };

    dispatch(addBirth(newBirthRecord));
    setNewBirth(newBirthVoid);
    setDialogOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={(e) => { setDialogOpen(false) }}>
      <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4 relative" onClick={(e)=> e.stopPropagation()}>

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Nouvelle demande d'acte de naissance
          </h2>
          <button
            onClick={() => setDialogOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Remplissez les informations pour créer une nouvelle demande
        </p>

        {/* Form */}
        <div className="space-y-4">
          {inputFields.map((field) => (
            <InputField
              key={field.key}
              label={field.label}
              type={field.type}
              value={newBirth[field.key as keyof BirthCerticat]}
              onChange={(value) =>
                setNewBirth({ ...newBirth, [field.key]: value })
              }
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleCreate}>
            Créer la demande
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBirth;
