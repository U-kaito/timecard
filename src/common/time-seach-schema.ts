import { z } from "zod";

export const TimeSearchSchema = z.object({
  year: z.number(),
  month: z.number(),
});