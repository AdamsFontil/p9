import express, { Request, Response } from 'express';
const router = express.Router();
import { NewPatientType, NonsensitivePatientType, PatientType } from '../types';
import patientsService from '../services/patientsService';
import { newPatientParser, errorMiddleware } from '../middleware';

router.get('/', (_req, res: Response<NonsensitivePatientType[]>) => {
  res.send(patientsService.getNonsensitivePatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientType>, res: Response<PatientType>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
