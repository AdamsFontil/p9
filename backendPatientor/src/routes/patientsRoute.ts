import express from 'express';
const router = express.Router();
import { Response } from 'express';
import { NonsensitivePatientType } from '../types';
import patientsService from '../services/patientsService';

router.get('/', (_req, res: Response<NonsensitivePatientType[]>) => {
  res.send(patientsService.getNonsensitivePatients());
});

router.post('/', (_req, res) => {
  res.send('saving diagnosis');
});

export default router;
