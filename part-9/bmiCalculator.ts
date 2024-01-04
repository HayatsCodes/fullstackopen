// Below 18.5	Underweight
// 18.5 – 24.9	Healthy Weight
// 25.0 – 29.9	Overweight
// 30.0 and Above	Obesity

const calculateBmi = (height: number, weight: number): string => {
    const heightInMeterSquared = (height / 100) ** 2;
    const result = weight /  heightInMeterSquared;

    if (result < 18.5) {
        return 'Underweight'
    } else if (result >= 18.5 && result <= 24.9) {
        return 'Normal (healthy weight)'
    } else if (result >= 25.0 && result <= 29.9) {
        return 'Overweight'
    } else {
        return 'Obesity'
    }
}

console.log(calculateBmi(180, 74))