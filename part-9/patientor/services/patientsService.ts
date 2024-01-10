import patientsData from '../data/patients'
import { Patients, nonSensitivePatients, newPatientEntry, Gender } from "../types";
// import { isObject } from '../utils';

import { v1 as uuid } from 'uuid'
import { parseDate, parseGender, parseString } from '../utils';

const patients = patientsData

export const getNonSensitivePatients = (): nonSensitivePatients[] => {
    return patients.map(({ id, name, gender, occupation,dateOfBirth }) => ({
        id,
        name,
        gender: gender as Gender,
        occupation,
        dateOfBirth
      }));
}

export const addPatient = (obj: newPatientEntry): Patients => {
    const id = uuid()
    const newPatient = {
      id,
      ssn: parseString(obj.ssn),
      name: parseString(obj.name),
      occupation: parseString(obj.occupation),
      gender: parseGender(obj.gender),
      dateOfBirth: parseDate(obj.dateOfBirth),
    }
    patientsData.push(newPatient);
    return newPatient
}