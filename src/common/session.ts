import { z } from "zod";

export const SessionSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  owner: z.boolean(),
  exp: z.number(),
});

export type Session = z.infer<typeof SessionSchema>;
