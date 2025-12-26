import express from 'express';
const router = express.Router();
import { Response } from 'express';
import { NonsensitivePatientType } from '../types';
import patientsService from '../services/patientsService';
import toNewPatientEntry  from '../utils';

router.get('/', (_req, res: Response<NonsensitivePatientType[]>) => {
  res.send(patientsService.getNonsensitivePatients());
});


router.post('/', (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(NewPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});




export default router;
