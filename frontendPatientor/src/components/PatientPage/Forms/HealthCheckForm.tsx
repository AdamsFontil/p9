// import { NewEntryFormValues } from "../../../types";
// import {  TextField, InputLabel, MenuItem, Select } from '@mui/material';
// type EntryProps = {
//   onCancel: () => void;
//   onSubmit: (values: NewEntryFormValues) => void;
// };

// const HealthCheckForm = ({ onCancel, onSubmit, setDiagnosisCodes }: EntryProps) => {
//     return (
//     <form onSubmit={() => onSubmit}
//   style={{
//     border: '2px dashed black',
//     padding: '12px',
//     borderRadius: '12px'
//       }}>

//         <InputLabel style={{ marginTop: 20 }}>Types</InputLabel>
//         <Select
//           label="Types"
//           fullWidth
//           value={type}
//         onChange={(e) => setType(e.target.value as EntryType)}
//         >
//         {types.map(option =>
//           <MenuItem
//             key={option}
//             value={option}
//           >
//             {option}
//           </MenuItem>
//         )}
//         </Select>

//       <TextField
//         label="description"
//         fullWidth
//         value={description}
//         onChange={({ target }) => setDescription(target.value)}
//       />
//             <TextField
//         label="date"
//         fullWidth
//         value={date}
//         onChange={({ target }) => setDate(target.value)}
//       />
//             <TextField
//         label="specialist"
//         fullWidth
//         value={specialist}
//         onChange={({ target }) => setSpecialist(target.value)}
//       />
//             <TextField
//         label="healthCheckRating"
//         fullWidth
//         value={healthCheckRating}
//         onChange={({ target }) =>
//         setHealthCheckRating(Number(target.value))
// }

//       />
//             <TextField
//         label="diagnosisCodes"
//         fullWidth
//         value={diagnosisCodes}
//           onChange={({ target }) =>
//     setDiagnosisCodes(
//       target.value.split(",").map(code => code.trim())
//     )
//   }
//       />



//       <div>
//         <button type="button" onClick={onCancel}>cancel</button>
//         <button type="button" onClick={() => onSubmit}>submit</button>
//       </div>

//     </form>
//   );
// }

// export default HealthCheckForm;
