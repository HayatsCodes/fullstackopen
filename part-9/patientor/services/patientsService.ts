import patientsData from '../data/patients'
import { Patients, nonSensitivePatients, newPatientEntry } from "../types";
// import { isObject } from '../utils';

import { v1 as uuid } from 'uuid'

const patients = patientsData

export const getNonSensitivePatients = (): nonSensitivePatients[] => {
    return patients.map(({ id, name, gender, occupation,dateOfBirth }) => ({
        id,
        name,
        gender,
        occupation,
        dateOfBirth
      }));
}

export const addPatient = (obj: newPatientEntry): Patients => {
    const id = uuid()
    const newPatient = {
      id,
      ...obj,
    }
    patientsData.push(newPatient);
    return newPatient
}