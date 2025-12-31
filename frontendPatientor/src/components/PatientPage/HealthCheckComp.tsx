import type { HealthCheckEntry } from "../../types";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Card } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


type HealthCheckEntryType = {
  entry: HealthCheckEntry,
    defineCode: (code: string) => string
};

const HealthCheckEntryComponent = ({ entry, defineCode }: HealthCheckEntryType) => {
  const evaluateHealthRating = (rating: number) => {
    console.log('what is rating', rating);
    switch (rating) {
      case 0:
        return <FavoriteIcon sx={{ color: 'blue' }} />;
      case 1:
        return <FavoriteIcon sx={{ color: 'green' }} />;
      case 2:
        return <FavoriteIcon sx={{ color: 'orange' }} />;
      case 3:
        return <FavoriteIcon sx={{ color: 'red' }} />;
      default:
        return 'Invalid rating';
    }
  };

  return (
    <Card   sx={{
    padding: '12px',
    margin: '8px',
    boxShadow: 3,
    border: '4px solid',
    borderColor: '#13a7f2ff',
    borderRadius: '8px',
    backgroundColor: 'white',
    }} key={entry.id}>
      <div style={{
        background:'redd'
      }}>
        <p>{entry.date} <HealthAndSafetyIcon /></p>
        <p><em>{entry.description}</em></p>
        <p>{evaluateHealthRating(entry.healthCheckRating)}</p>
          <p>Diagnosed by: {entry.specialist}</p>
      </div>
            <div> <h3>Diagnosis Code: </h3>
        {entry.diagnosisCodes?.map((code, index) => (
        <ul key={index}>
          <li>{code}: {defineCode(code)}</li>
        </ul>
        ))}</div>
    </Card>
  );
};

export default HealthCheckEntryComponent;
