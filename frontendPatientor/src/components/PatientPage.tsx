import { useParams } from "react-router-dom";
import { useState } from "react";
import { Diagnosis, Entry, Patient } from "../types";
import { useEffect } from "react";
import patientService from "../services/patientService";
import { Female, Male, Transgender } from "@mui/icons-material";
import diagnosisService from "../services/diagnosisService";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const foundPatient = await patientService.getPatient(id);
      console.log('retrieved patient---', foundPatient);
      setPatient(foundPatient);
    };
    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const retrievedDiagnoses = await diagnosisService.getDiagnoses();
      console.log('retrieved codes---', retrievedDiagnoses);
      setDiagnoses(retrievedDiagnoses);
    };
    console.log('run for diagnoses');
    fetchDiagnoses();
  }, []);


  if (!patient) {
    return (
      <div>
        No Patient Found, ID might be wrong
      </div>
    );
}

  console.log('what are diagnoses---', diagnoses);

  const defineCode = (code: string) => {
    console.log('code received--', code);
    const match = diagnoses?.find(diagnosis => {
      return diagnosis.code === code;
    });
    console.log('match found???', match);
    if (match) {
      return match.name;
    } else {
      return 'code not found';
    }
  };

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
          <div>{entry.diagnosisCodes?.map((code, index) => (
            <ul key={index}>
              <li>{code}: {defineCode(code)}</li>
            </ul>
          ))}</div>
        </div>
))}

      </div>
    </div>
  );
};

export default PatientPage;
