type stringRating = 'bad, but keep trying' | 'not too bad but could be better' | 'excellent';
interface ExercisesResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: stringRating,
    target: number,
    average: number
}

const calculateExercises = (dailyExercises: number[], target: number): ExercisesResult => {
    const periodLength = dailyExercises.length;
    let countTrainingDays = 0;
    dailyExercises.forEach(exercise => {
        if (exercise > 0) {
            countTrainingDays += 1;
        }
    });
    const trainingDays = countTrainingDays;
    const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
    const successRate = (average / target);
    let success;
    let rating: 1 | 2 | 3;
    let ratingDescription: stringRating;

    if (successRate >= 0.5 && successRate < 1) {
        success = false;
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else if (successRate < 0.5) {
        success = false;
        rating = 1;
        ratingDescription = 'bad, but keep trying';
    } else {
        success = true;
        rating = 3;
        ratingDescription = 'excellent';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const allArguments = process.argv.slice(2);
const target = Number(allArguments[0]);
const exercises = allArguments.slice(1).map(exercise => Number(exercise));


console.log(calculateExercises(exercises, target));