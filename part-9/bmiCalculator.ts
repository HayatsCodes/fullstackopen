interface BmiValues {
    height: number,
    weight: number
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
      return {
        height: Number(args[0]),
        weight: Number(args[1])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const calculateBmi = (height: number, weight: number): string => {
    const heightInMeterSquared = (height / 100) ** 2;
    const result = weight / heightInMeterSquared;

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

try {
    const args = process.argv.slice(2);
    const { height, weight } = parseArguments(args);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}