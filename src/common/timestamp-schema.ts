import { z } from "zod";

export const TimeStampSchema = z.object({
  date: z.string(),
  lat: z.number(),
  lng: z.number(),
});
