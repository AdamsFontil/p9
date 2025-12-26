
export type gender = 'male' | 'female' | 'other';

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
  gender: gender,
  occupation: string
};


export type NonsensitivePatientType = Omit<PatientType, 'ssn'>;
