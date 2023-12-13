import { z } from "zod";

export const AddUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  owner: z.boolean(),
});
