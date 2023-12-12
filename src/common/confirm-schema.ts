import { z } from "zod"

export const ConfirmSchema = z.object({
  confirmCode: z.string(),
})
