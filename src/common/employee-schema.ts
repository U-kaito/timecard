import { z } from "zod";

export interface Employee{
  id: number
  email: string
  firstName: string
  lastName: string
  owner: boolean
}

export const EmployeeAddSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  owner: z.boolean(),
});
