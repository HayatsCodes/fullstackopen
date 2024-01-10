import express from 'express'
import { getNonSensitivePatients, addPatient } from '../services/patientsService'
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(getNonSensitivePatients());
})

patientsRouter.post('/', (req, res) => {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
})

export default patientsRouter