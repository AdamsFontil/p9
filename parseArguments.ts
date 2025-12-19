  interface bmiValues {
  value1: number,
  value2: number,
  value3 : number[]
}

export const parseArguments = (args: string[]): bmiValues => {
  if (args[1].includes('bmiCalculator.ts')){
    console.log('calculating bmi');
      if (args.length > 4) throw new Error('Too many args for bmi Calc');
      if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          value1: Number(args[2]),
          value2: Number(args[3]),
          value3: [0]
        };
      }
  }
  else if (args[1].includes('exerciseCalculator.ts')) {
    console.log('caclulating avg hrs of exercise');
    const value3: number[] = [];
    for (let i = 3; i < args.length; i++) {
      const num = Number(args[i]);

      if (isNaN(num)) {
        throw new Error(`Argument ${args[i]} is not a valid number.`);
      }
      value3.push(num);
    }
    const value1 = Number(args[2]);
    return {
      value1,
      value2: 0,
      value3
    };
  }

    else {
        throw new Error('Please only provide numbers');
  }

    return {
    value1: 0,
    value2: 0,
    value3: []
  };
};
