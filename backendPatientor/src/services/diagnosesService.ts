import diagnosesData from '../../data/diagnosesData';
import { DiagnosisEntry } from '../types';

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnosesData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};
