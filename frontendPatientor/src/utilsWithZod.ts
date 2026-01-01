// import { z } from "zod";

// export const GenderSchema = z.enum(["male", "female", "other"]);

// export const HealthCheckRatingSchema = z.enum([
//   "0",
//   "1",
//   "2",
//   "3"
// ]).transform(Number);


// const BaseEntrySchema = z.object({
//   description: z.string(),
//   date: z.iso.date(),
//   specialist: z.string(),
//   diagnosisCodes: z.array(z.string()).optional()
// });


// const HealthCheckEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("HealthCheck"),
//   healthCheckRating: z.enum({
//     Healthy: 0,
//     LowRisk: 1,
//     HighRisk: 2,
//     CriticalRisk: 3
//   })
// });

// const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("OccupationalHealthcare"),
//   employerName: z.string(),
//   sickLeave: z
//     .object({
//       startDate: z.iso.date(),
//       endDate: z.string().date()
//     })
//     .optional()
// });

// const HospitalEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("Hospital"),
//   discharge: z.object({
//     date: z.string().date(),
//     criteria: z.string()
//   })
// });



// export const EntrySchema = z.discriminatedUnion("type", [
//   HealthCheckEntrySchema,
//   OccupationalHealthcareEntrySchema,
//   HospitalEntrySchema
// ]);



// export const NewPatientSchema = z.object({
//   name: z.string(),
//   ssn: z.string(),
//   dateOfBirth: z.string().date(),
//   gender: GenderSchema,
//   occupation: z.string(),
//   entries: z.array(EntrySchema).default([])
// });
