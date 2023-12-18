import { CognitoIdToken } from "amazon-cognito-identity-js";
import { Session } from "@/common/session";

export async function getServerSession(
  req: { cookies: Partial<{ [key: string]: string }> },
  ownerOnly?: boolean,
) {
  const token = req.cookies["_token"];
  if (!token) {
    return null;
  }

  let idToken = null;
  try {
    idToken = new CognitoIdToken({ IdToken: token });
  } catch (e) {
    return null;
  }
  if (!idToken) {
    throw new Error(`Invalid session`);
  }
  const data = {
    email: idToken.payload.email,
    name: idToken.payload["custom:name"],
    owner: idToken.payload["custom:owner"],
    exp: idToken.payload.exp,
  } as Session;
  if (ownerOnly && !data.owner) return null;

  return data;
}
