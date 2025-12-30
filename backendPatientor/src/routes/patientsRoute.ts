import express, { Request, Response } from 'express';
const router = express.Router();
import { NewPatientType, NonSensitivePatient, Patient } from '../types';
import patientsService from '../services/patientsService';
import { newPatientParser, errorMiddleware } from '../middleware';

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



router.use(errorMiddleware);

export default router;
