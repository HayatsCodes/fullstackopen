import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

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
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    const results = calculateExercises(daily_exercises as number[], target as number);
    res.json(results);
});

app.listen(3003, () => {
    console.log(`Server running on port 3003`);
});