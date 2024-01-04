import express from 'express'
import { calculateBmi } from './bmiCalculator';
const app = express();
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if ((!height || !weight) || (isNaN(Number(weight)) || isNaN(Number(height)))) {
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
        weight: Number(weight),
        height: Number(height),
        bmi
    });
})

app.listen(3003, () => {
    console.log(`Server running on port 3003`);
})