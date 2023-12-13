import { prisma } from "@/common/prisma"
import { CognitoAccessToken } from 'amazon-cognito-identity-js';

export async function getServerSession(
  req: { cookies: Partial<{ [key: string]: string }> },
  ownerOnly?: boolean
){
  const token = req.cookies["_token"]
  if (!token) {
    return null
  }

  const accessToken = new CognitoAccessToken({AccessToken: token})
  //username取り出してDBと連携
  const user = await prisma.user.findUnique({awsName: accessToken.payload.username})
  const data = {
    id: user.id,
    name: user.lastName . user.firstName,
    owner: user.owner,
  }
  if (ownerOnly && !data.owner) return null

  return data
}
