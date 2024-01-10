export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patients{
    id: string,
    name: string,
    gender: Gender,
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