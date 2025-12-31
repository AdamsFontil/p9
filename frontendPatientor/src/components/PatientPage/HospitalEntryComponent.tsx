import { HospitalEntry } from "../../types";
import { Card } from "@mui/material";
import MasksIcon from '@mui/icons-material/Masks';

type HospitalEntryType = {
  entry: HospitalEntry,
  defineCode: (code: string) => string
};

const HospitalEntryComponent = ({ entry, defineCode}: HospitalEntryType) => {
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
      <p>{entry.date} <MasksIcon /></p>
      <p>{entry.description}</p>
      <div>{entry.diagnosisCodes?.map((code, index) => (
        <ul key={index}>
          <li>{code}: {defineCode(code)}</li>
        </ul>
      ))}</div>
    </Card>
  );
};

export default HospitalEntryComponent;
