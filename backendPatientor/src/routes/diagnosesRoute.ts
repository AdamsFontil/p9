import express from 'express';
const router = express.Router();
import { Response } from 'express';
import { DiagnosisEntry } from '../types';
import diagnosesService from '../services/diagnosesService';

router.get('/', (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('saving diagnosis');
});

export default router;
