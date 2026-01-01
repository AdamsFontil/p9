import PatientsData from '../../data/patientsData';
import { NonSensitivePatient, NewPatientType, Patient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getNonsensitivePatients = (): NonSensitivePatient[] => {
  return PatientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getOnePatient = (id: string): Patient | undefined => {
  const match = PatientsData.find((patient) => patient.id === id);
  console.log('match--', match);
  if (match) {
    return match;
  } else {
    throw new Error('no match found');
  }
};

const addPatient = (entry: NewPatientType): Patient  => {
  console.log('entry is---',entry);
  const NewPatientEntry = {
    id: uuid(),
    ...entry
  };
  console.log('new patient---',NewPatientEntry);
  PatientsData.push(NewPatientEntry);
  return NewPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntryForTarget = {
    id: uuid(),
    ...entry
  };
  const target = PatientsData.find((patient) => patient.id === id);
  if (!target) {
    throw new Error('Patient not found- id may be wrong');
  }
  const targetEntries = target.entries;
  targetEntries.push(newEntryForTarget);
  return newEntryForTarget;
};

export default {
  getNonsensitivePatients,
  addPatient, getOnePatient, addEntry
};
