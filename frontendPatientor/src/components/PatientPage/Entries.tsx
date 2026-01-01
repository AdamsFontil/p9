import { useState, useEffect } from "react";
import diagnosisService from "../../services/diagnosisService";
import { Diagnosis, Entry, NewEntryFormValues, Patient } from "../../types";
import HospitalEntryComponent from "./HospitalEntryComponent";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareComp";
import HealthCheckEntryComponent from "./HealthCheckComp";
import patientService from "../../services/patientService";
import { Button } from "@mui/material";
import EntryForm from "./PatientModal/EntryForm";

type EntryProps = {
  patient: Patient
};

const Entries = ({ patient}: EntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [entries, setEntries] = useState(patient.entries);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  console.log('modal stat--', modalOpen);

    useEffect(() => {
    const fetchDiagnoses = async () => {
      const retrievedDiagnoses = await diagnosisService.getDiagnoses();
      console.log('retrieved codes---', retrievedDiagnoses);
      setDiagnoses(retrievedDiagnoses);
    };
    console.log('run for diagnoses');
    fetchDiagnoses();
  }, []);

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

  const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
  };

    const openModal = (): void => {
    setModalOpen(true);
    console.log('OPENING MODAL');
  };

  const closeModal = (): void => {
    console.log('CLOSING MOAL');
    setModalOpen(false);
  };

    const submitNewEntry = async (values: NewEntryFormValues) => {

      const entry = await patientService.createEntry(patient.id, values);
      setEntries(entries.concat(entry));
      console.log('entry---', entry);
      closeModal();


  };
  return (
    <div>
      <h4>Entries</h4>
      {modalOpen === false && <Button variant="contained" onClick={openModal}>Add New Entry</Button> }
      {modalOpen === true && <EntryForm onCancel={closeModal} onSubmit={submitNewEntry} />}
      {entries.map((entry: Entry) => {
        switch (entry.type) {
          case "Hospital":
            return <HospitalEntryComponent key={entry.id} entry={entry} defineCode={defineCode} />;
          case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent key={entry.id} entry={entry} defineCode={defineCode} />;
          case "HealthCheck":
            return <HealthCheckEntryComponent key={entry.id} entry={entry} defineCode={defineCode} />;
          default:
            return assertNever(entry);
        }
      }
      )}

    </div>
  );
};



export default Entries;
