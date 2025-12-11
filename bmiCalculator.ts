import { parseArguments } from "./parseArguments"
const calculateBmi = (height: number, weight: number) => {
  const meters = height / 100
  const meters2 = meters * meters
  const bmi = weight / meters2

  console.log('bmi is---', bmi);
  if (bmi < 18.5) console.log('Underweight')
  else if (bmi > 25 && bmi < 30) console.log( 'Overweight')
  else if (bmi > 30) console.log( 'Obese')
  else console.log( 'Normal Range')


}

try {
  const { value1, value2 } = parseArguments(process.argv)
  calculateBmi(value1, value2)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong'
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage);
}
