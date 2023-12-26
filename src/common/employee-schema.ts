import { z } from "zod";

export const EmployeeAddSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  owner: z.boolean(),
});
