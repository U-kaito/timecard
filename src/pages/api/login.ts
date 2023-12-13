import { NextApiRequest, NextApiResponse } from "next"
import { LoginSchema } from "@/common/login-schema"
import { setCookie } from "cookies-next"
import { prisma } from "@/common/prisma"
import { withErrorHandler } from "@/server/error-handler"
import { login } from "@/common/aws-cognito"

export default withErrorHandler(async (req, res) => {
  if (req.method === "POST") {
    await postLogin(req, res)
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }
})

export async function postLogin(req: NextApiRequest, res: NextApiResponse) {
  const result = LoginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ message: "Bad Request" })
    return
  }
  const token = await login(result.data.email, result.data.password)
  //dbにユーザーが存在するか確認（存在していなかったら401エラー）
  const user = await prisma.user.findUnique({ where: { email: result.data.email } })
  if (!user){
    res.status(401).json({ message: "Unauthorized" })
    return
  }
  //クッキーにトークンを保存する
  setCookie("_token", token, { req, res, secure: true, sameSite: true })
  res.status(200).json({ message: "OK" })
}
