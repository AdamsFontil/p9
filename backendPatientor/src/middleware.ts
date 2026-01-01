import z from "zod";
import { Request, Response, NextFunction } from "express";
import { EntrySchema, NewPatientSchema } from "./utilsZod";

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  console.log('parsing data');
  try {
    req.body = NewPatientSchema.parse(req.body);
    console.log('data parsed');
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  console.log('parsing only entries for target patient');
  try {
    req.body = EntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
