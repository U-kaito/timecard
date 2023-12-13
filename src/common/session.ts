import { z } from "zod";

export const SessionSchema = z.object({
  sub: z.string(),
  iss: z.string(),
  client_id: z.string(),
  origin_jti: z.string(),
  event_id: z.string(),
  token_use: z.string(),
  scope: z.string(),
  auth_time: z.number(),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
  username: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;
