import { NextApiRequest, NextApiResponse } from "next"
import { AddUserSchema } from "@/common/user-schema"
import { prisma } from "@/common/prisma"
import { withErrorHandler } from "@/server/error-handler"
import { signUp } from "@/common/aws-cognito"

export default withErrorHandler(async (req, res) => {
  if (req.method === "POST") {
    await addUser(req, res)
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }
})

export async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const result = AddUserSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ message: "Bad Request" })
    return
  }

  await signUp(result.data.email, result.data.password)
  await prisma.pendingUser.create({
    data:{
      email: result.data.email,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }
  })
  res.status(200).json({ message: "OK" })
}
