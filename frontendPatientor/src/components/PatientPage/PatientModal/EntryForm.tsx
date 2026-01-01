import { TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { HealthCheckRating, NewEntryFormValues } from "../../../types";

type EntryProps = {
  onCancel: () => void;
  onSubmit: (values: NewEntryFormValues) => void;
};




const EntryForm = ({ onCancel, onSubmit }: EntryProps) => {
  const [type, setType] = useState("HealthCheck");
  const [description, setDescription] = useState('Testing Frontend');
  const [date, setDate] = useState('2025-01-10');
  const [specialist, setSpecialist] = useState('REACT');
const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.CriticalRisk);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>(["Z00.0"]);

  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('adding from FORM');
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    });
  };



  return (
    <form onSubmit={addEntry}
  style={{
    border: '2px dashed black',
    padding: '12px',
    borderRadius: '12px'
  }}
>

      <TextField
        label="type"
        fullWidth
        value={type}
        onChange={ () => setType("HealthCheck")}
      />
      <TextField
        label="description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
            <TextField
        label="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
            <TextField
        label="specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
            <TextField
        label="healthCheckRating"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) =>
        setHealthCheckRating(Number(target.value))
}

      />
            <TextField
        label="diagnosisCodes"
        fullWidth
        value={diagnosisCodes}
          onChange={({ target }) =>
    setDiagnosisCodes(
      target.value.split(",").map(code => code.trim())
    )
  }
      />

      <div>
        <button type="button" onClick={onCancel}>cancel</button>
        <button type="button" onClick={addEntry}>submit</button>
      </div>

    </form>
  );
};


export default EntryForm;
