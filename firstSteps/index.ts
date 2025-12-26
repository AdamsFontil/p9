import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});


app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  console.log('type of height', typeof (height));
  const bmi = calculateBmi(height, weight);
  console.log('bmi???', bmi);

  res.json({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'missing parameters' });
  }
    if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((n: unknown) => isNaN(Number(n))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const days: number[] = daily_exercises.map(Number);
  const goal: number = Number(target);

  return res.send(exerciseCalculator(days, goal));

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
