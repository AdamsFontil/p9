import { SyntheticEvent, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import {
  HealthCheckRating,
  NewEntryFormValues
} from "../../../types";

type EntryProps = {
  onCancel: () => void;
  onSubmit: (values: NewEntryFormValues) => void;
};

const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"] as const;
type EntryType = typeof entryTypes[number];

const EntryForm = ({ onCancel, onSubmit }: EntryProps) => {
  const [type, setType] = useState<EntryType>("HealthCheck");

  // shared fields
  const [description, setDescription] = useState("testing");
  const [date, setDate] = useState("2015-01-01");
  const [specialist, setSpecialist] = useState("set specialist");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>(['not valid']);

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(HealthCheckRating.Healthy);

  // Hospital
  const [discharge, setDischarge] = useState({
    date: "2014-01-01",
    criteria: "2014-01-04"
  });

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("fbi");

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    switch (type) {
      case "HealthCheck":
        console.log('submiting type---', type);
        onSubmit({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating
        });
        break;

      case "Hospital":
        console.log('submiting type---', type);
        onSubmit({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge
        });
        break;

      case "OccupationalHealthcare":
        console.log('submiting type---', type);
        onSubmit({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName
        });
        break;
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 12, border: "2px dashed black" }}>
      {/* TYPE SELECTION */}
      <InputLabel style={{ marginTop: 12 }}>Type</InputLabel>
      <Select
        fullWidth
        value={type}
        onChange={(e) => setType(e.target.value as EntryType)}
      >
        {entryTypes.map(t => (
          <MenuItem key={t} value={t}>{t}</MenuItem>
        ))}
      </Select>

      {/* SHARED FIELDS */}
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        label="Date"
        fullWidth
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <TextField
        label="Specialist"
        fullWidth
        margin="normal"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />

      <TextField
        label="Diagnosis codes (comma separated)"
        fullWidth
        margin="normal"
        value={diagnosisCodes.join(", ")}
        onChange={(e) =>
          setDiagnosisCodes(
            e.target.value.split(",").map(c => c.trim())
          )
        }
      />

      {/* TYPE-SPECIFIC FIELDS */}
      {type === "HealthCheck" && (
        <TextField
          label="Health check rating (0–3)"
          type="number"
          fullWidth
          margin="normal"
          inputProps={{ min: 0, max: 3 }}
          value={healthCheckRating}
          onChange={(e) =>
            setHealthCheckRating(
              Number(e.target.value) as HealthCheckRating
            )
          }
        />
      )}

      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge date"
            fullWidth
            margin="normal"
            value={discharge.date}
            onChange={(e) =>
              setDischarge({ ...discharge, date: e.target.value })
            }
          />
          <TextField
            label="Discharge criteria"
            fullWidth
            margin="normal"
            value={discharge.criteria}
            onChange={(e) =>
              setDischarge({ ...discharge, criteria: e.target.value })
            }
          />
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <TextField
          label="Employer name"
          fullWidth
          margin="normal"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />
      )}

      {/* ACTIONS */}
      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={onCancel}>cancel</button>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default EntryForm;
