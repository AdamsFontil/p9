import { SyntheticEvent, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Checkbox,
  ListItemText
} from "@mui/material";
import {
  Diagnosis,
  HealthCheckRating,
  NewEntryFormValues
} from "../../../types";

type EntryProps = {
  onCancel: () => void;
  onSubmit: (values: NewEntryFormValues) => void;
  codes: Diagnosis[] | null;
};

const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"] as const;
type EntryType = typeof entryTypes[number];

const EntryForm = ({ onCancel, onSubmit, codes }: EntryProps) => {
  const [type, setType] = useState<EntryType>("HealthCheck");

  // shared fields
  const [description, setDescription] = useState("testing");
  const [date, setDate] = useState("2015-01-01");
  const [specialist, setSpecialist] = useState("set specialist");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

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

  console.log('D-CODES----', codes);

    const handleChangeForCodes = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <TextField
        label="Specialist"
        fullWidth
        margin="normal"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />

      <Select
          label="Diagnosis codes (comma separated)"
          fullWidth
          // margin="normal"
          multiple
          value={diagnosisCodes}
          onChange={handleChangeForCodes}
          // input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          // MenuProps={MenuProps}
        >
          {codes?.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
              <ListItemText  primary={`${diagnosis.code} — ${diagnosis.name}`} />

            </MenuItem>
          ))}
      </Select>

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
            type="date"
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
