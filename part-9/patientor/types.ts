export interface Patients{
    id: string,
    name: string,
    gender: string,
    occupation: string,
    ssn: string,
    dateOfBirth: string
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export type nonSensitivePatients = Omit<Patients, 'ssn'>
export type newPatientEntry = Omit<Patients, 'id'>