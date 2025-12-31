import { OccupationalHealthcareEntry } from "../../types";
import { Card } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

type OccupationalHealthcareEntryType = {
  entry: OccupationalHealthcareEntry,
    defineCode: (code: string) => string
};

const OccupationalHealthcareEntryComponent = ({ entry, defineCode}: OccupationalHealthcareEntryType) => {
  return (
    <Card sx={{
    padding: '12px',
    margin: '8px',
    boxShadow: 3,
    border: '4px solid',
    borderColor: '#13a7f2ff',
    borderRadius: '8px',
    backgroundColor: 'white',
    }} key={entry.id}>
      <p>{entry.date} <WorkIcon /> Employer:{entry.employerName}</p>
      <p><em>{entry.description}</em></p>
      <p>Diagnosed by: {entry.specialist}</p>
      <div> <h3>Diagnosis Code: </h3>
        {entry.diagnosisCodes?.map((code, index) => (
        <ul key={index}>
          <li>{code}: {defineCode(code)}</li>
        </ul>
        ))}</div>
      {entry.sickLeave && (
        <div>
          <h3>Sick Leaves:</h3>
          <p>Start: {entry.sickLeave.startDate}</p>
          <p>End: {entry.sickLeave.endDate}</p>
        </div>
      )}

    </Card>
  );
};

export default OccupationalHealthcareEntryComponent;
