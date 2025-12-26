

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



export type PatientType = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
};

export type NewPatientType = Omit<PatientType, 'id'>;

export type NonsensitivePatientType = Omit<PatientType, 'ssn'>;
