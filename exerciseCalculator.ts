import { parseArguments } from "./parseArguments";
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: string,
  ratingDescription: string,
  target: number,
  average: number
}

const exerciseCalculator = (days: number[], goal: number): Result => {

  // console.log('days are---', days);
  // console.log('goal is', goal);
  const totalHrsTrained = days.reduce((total, num) => total + num, 0);
  const avgTrained = totalHrsTrained/ days.length;
  const periodLength = days.length;
  const success = avgTrained > goal;
 const rating = (avgTrained/goal)*100;
 const ratingPercentage = rating.toFixed(2);

  let ratingDescription = 'Not your week';
  if (rating > 100) {
    ratingDescription = 'excellent week';
  }
  else if (rating > 90) {
    ratingDescription = 'very close to an excellent week';
  }
  else if (rating > 70) {
    ratingDescription = 'work on consistency';
  }

  console.log('what is rating', rating);

  console.log('what is success', success);

  console.log({
    'periodLength': periodLength,
    'trainingDays': days.filter(day => day > 0).length,
    'success': success,
    'rating': `${ratingPercentage}%`,
    'ratingDescription': ratingDescription,
    'target': goal,
    'average': avgTrained
  });

  return {
    'periodLength': periodLength,
    'trainingDays': days.filter(day => day > 0).length,
    'success': success,
    'rating': `${ratingPercentage}%`,
    'ratingDescription': ratingDescription,
    'target': goal,
    'average': avgTrained
  };


};

try {
  const { value1, value3 } = parseArguments(process.argv);
  exerciseCalculator(value3, value1);
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
