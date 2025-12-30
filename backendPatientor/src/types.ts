// import z from "zod";
// import { newPatientSchema } from "./utils";

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}


export type DiagnosisEntry = {
  code: string,
  name: string,
  latin?: string
};

// export type NewPatientType = z.infer<typeof newPatientSchema>;

// export interface PatientType extends NewPatientType {
//   id: string;
// }



// export type NonsensitivePatientType = Omit<PatientType, 'ssn'>;


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}


export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NewPatientType = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
