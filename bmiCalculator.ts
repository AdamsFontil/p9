const calculateBmi = (height:number, weight:number ): string => {
  const meters = height / 100
  const meters2 = meters * meters
  const bmi = weight / meters2

  console.log('bmi is---', bmi);
  if (bmi < 18.5) return 'Underweight'
  else if (bmi > 25 && bmi < 30) return 'Overweight'
  else if (bmi > 30) return 'Obese'
  else return 'Normal Range'


}

console.log(calculateBmi(180, 84))
