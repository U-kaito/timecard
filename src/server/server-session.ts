import { SessionMapper, SessionType, UnionSessionSchema } from "@/common/session"
import { DecodedIdToken } from "firebase-admin/auth"
import { adminAuth } from "@/common/firebase"

export async function getServerSession<T extends SessionType>(
  req: { cookies: Partial<{ [key: string]: string }> },
  type?: T,
  ownerOnly?: boolean
): Promise<SessionMapper<T> | null> {
  const token = req.cookies["_token"]
  if (!token) {
    return null
  }

  let decoded: DecodedIdToken
  try {
    decoded = await adminAuth.verifyIdToken(token)
  } catch (e) {
    return null
  }

  if (type && decoded.type !== type) return null

  const result = UnionSessionSchema.safeParse(decoded)
  if (!result.success) {
    // ユーザーはJWTを改ざんすることはできないので、恐らくアップデートで不整合が発生した
    throw new Error(`Invalid session: ${JSON.stringify(decoded)}`)
  }

  const data = result.data as SessionMapper<T>
  if (ownerOnly && !data.owner) return null

  return data
}
