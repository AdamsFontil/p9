import diagnosesData from '../../data/diagnosesData';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};
