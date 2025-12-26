import PatientsData from '../../data/patientsData';
import { NonsensitivePatientType, NewPatientType, PatientType } from '../types';
import { v1 as uuid } from 'uuid';

const getNonsensitivePatients = (): NonsensitivePatientType[] => {
  return PatientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


const addPatient = (entry: NewPatientType): PatientType  => {
  console.log('entry is---',entry);
  const NewPatientEntry = {
    id: uuid(),
    ...entry
  };
  console.log('new patient---',NewPatientEntry);
  PatientsData.push(NewPatientEntry);
  return NewPatientEntry;
};

export default {
  getNonsensitivePatients,
  addPatient
};
