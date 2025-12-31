import { useParams } from "react-router-dom";
import { useState } from "react";
import { Patient } from "../types";
import { useEffect } from "react";
import patientService from "../services/patientService";
import { Female, Male, Transgender } from "@mui/icons-material";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const foundPatient = await patientService.getPatient(id);
      console.log('retrieved patient---', foundPatient);
      setPatient(foundPatient);
    };
    fetchPatient();
  }, [id]);


  if (!patient) {
    return (
      <div>
        No Patient Found, ID might be wrong
      </div>
    );
}

  console.log('what is id', id);
  return (
    <div>
      <h3>{patient.name}
        {patient.gender === 'female' && <Female />}
        {patient.gender === 'male' && <Male />}
        {patient.gender === 'other' && <Transgender />}
      </h3>
      <div>
        <p>snn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    </div>
  );
};

export default PatientPage;
