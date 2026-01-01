import express, { Request, Response } from 'express';
const router = express.Router();
import { NewPatientType, NonSensitivePatient, Patient, Entry, NewEntry } from '../types';
import patientsService from '../services/patientsService';
import { newPatientParser, errorMiddleware, newEntryParser } from '../middleware';

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  console.log('getting patients');
  res.send(patientsService.getNonsensitivePatients());

});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientType>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
  console.log('one patient route testing');
  const { id } = req.params;
  console.log('id received--', id);
  res.send(patientsService.getOnePatient(id));
});


router.post(
  '/:id/entries', newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const { id } = req.params;
    const entry = req.body;
    const addedEntry = patientsService.addEntry(id, entry);
    console.log('what is addedEntry--', addedEntry);
    res.json(addedEntry);
  }
);






router.use(errorMiddleware);

export default router;
