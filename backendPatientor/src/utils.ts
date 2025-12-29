import { Gender } from "./types";
import z from "zod";

export const newPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export default newPatientSchema;
