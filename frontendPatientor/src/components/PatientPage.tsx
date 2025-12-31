import { useParams } from "react-router-dom";
import { useState } from "react";
import { Entry, Patient } from "../types";
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
  console.log('patient entries', patient.entries);
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
      <div>
        <h4>Entries</h4>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>{entry.diagnosisCodes?.map((code) => (
            <ul>
              <li>{code}</li>
            </ul>
          ))}</p>
        </div>
))}




      </div>
    </div>
  );
};

export default PatientPage;
