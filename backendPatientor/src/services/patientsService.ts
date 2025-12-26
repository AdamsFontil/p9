import PatientsData from '../../data/patientsData';
import { NonsensitivePatientType } from '../types';

const getNonsensitivePatients = (): NonsensitivePatientType[] => {
  return PatientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


const addPatient = () => {
  return null;
};

export default {
  getNonsensitivePatients,
  addPatient
};
