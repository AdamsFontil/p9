import z from "zod";
import { newPatientSchema } from "./utils";

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

export type NewPatientType = z.infer<typeof newPatientSchema>;

export interface PatientType extends NewPatientType {
  id: string;
}



export type NonsensitivePatientType = Omit<PatientType, 'ssn'>;
