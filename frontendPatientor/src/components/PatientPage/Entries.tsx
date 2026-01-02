import { useState, useEffect } from "react";
import diagnosisService from "../../services/diagnosisService";
import { Diagnosis, Entry, NewEntryFormValues, Patient } from "../../types";
import HospitalEntryComponent from "./HospitalEntryComponent";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareComp";
import HealthCheckEntryComponent from "./HealthCheckComp";
import patientService from "../../services/patientService";
import { Button, Alert } from "@mui/material";
import EntryForm from "./Forms/EntryForm";
import axios from "axios";

type EntryProps = {
  patient: Patient
};

const Entries = ({ patient}: EntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [entries, setEntries] = useState(patient.entries);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState('');

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
    console.log('values received--', values);

    try {
      const entry = await patientService.createEntry(patient.id, values);
      setEntries(entries.concat(entry));
      console.log('entry---', entry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError(`Unrecognized axios error: ${e.response?.data.error[0].message}`);
          console.log('unrecognized--', e.response?.data.error);
          console.log('unrecognized error----', e.response?.data.error[0].message);
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        console.log('unknown error---', e);
      }
    }
  };





  return (
    <div>
      <h4>Entries</h4>
      <div style={{padding: '12px'}}>{error && <Alert severity="error">{error}</Alert>}</div>
      {modalOpen === false && <Button variant="contained" onClick={openModal}>Add New Entry</Button> }
      {modalOpen === true && <EntryForm codes={diagnoses} onCancel={closeModal} onSubmit={submitNewEntry} />}
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
