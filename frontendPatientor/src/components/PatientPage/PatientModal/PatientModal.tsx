// import { useState } from "react";
// import { Button } from "@mui/material";
// import EntryForm from "./EntryForm";
// import { NewEntryFormValues } from "../../../types";

// interface PatientModalProps {
//   // modalOpen: boolean;
//   // onClose: () => void;
//   onSubmit: (values: NewEntryFormValues) => void;
//   // error?: string;
// }


// const PatientModal = ({ onSubmit }: PatientModalProps) => {
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   console.log('modal stat--', modalOpen);

//   const openModal = (): void => {
//     setModalOpen(true);
//     console.log('OPENING MODAL');
//   };

//   const closeModal = (): void => {
//     console.log('CLOSING MOAL');
//     setModalOpen(false);
//   };


//   if (modalOpen === true) return (
//     <div>
//       <EntryForm onCancel={closeModal} onSubmit={onSubmit} />
//     </div>
//   );

//   console.log('what is modal status', modalOpen);


//   return (
//     <div>
//       <p>Patient modal</p>
//       <Button variant="contained" onClick={openModal}>Add New Entry</Button>

//     </div>
//   );
// };


// export default PatientModal;
