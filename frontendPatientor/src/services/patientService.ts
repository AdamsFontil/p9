import axios from "axios";
import { Entry, NewEntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id:string ,object: NewEntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`, object
  );
  console.log('what is data---', data);
  return data;
};

const getPatient = async (id: string | undefined) => {
  if (!id) {
    throw new Error('ID not provided');
  }
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  console.log('what is data---', data);
  return data;
};

export default {
  getAll, create, getPatient, createEntry
};
