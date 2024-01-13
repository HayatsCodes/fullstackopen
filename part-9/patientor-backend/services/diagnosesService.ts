import diagnosesData from '../data/diagnoses';
import { Diagnosis } from '../types';

const Diagnoses: Diagnosis[] = diagnosesData

export const getDiagnoses = (): Diagnosis[] => {
    return Diagnoses
}