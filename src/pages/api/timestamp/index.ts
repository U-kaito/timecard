import { NextApiRequest, NextApiResponse } from "next";
import { withErrorHandler } from "@/server/error-handler";
import { prisma } from "@/common/prisma";
import { Session } from "@/common/session";
import { getServerSession } from "@/server/server-session";
import { TimeStampSchema } from "@/common/timestamp-schema";
import { searchAddress } from "@/common/google-map";

export default withErrorHandler(async (req, res) => {
  const session = await getServerSession(req);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "POST") {
    await postTimestamp(req, res, session);
  } else if (req.method === "PUT") {
    await putTimestamp(req, res, session);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
});

async function postTimestamp(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
) {
  const input = TimeStampSchema.safeParse(req.body);
  if (!input.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { email: session.email },
  });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
  const timestamp = await prisma.timeStamp.findFirst({
    where: {
      userId: user.id,
      finishTime: null,
    },
  });
  if (timestamp) {
    res.status(400).json({ message: "Already at work" });
    return;
  }
  //timezoneを考える。
  const date = new Date(input.data.date);
  const place = await searchAddress(input.data.lat, input.data.lng);
  if (!place) {
    res.status(400).json({ message: "Can't get address" });
    return;
  }
  await prisma.timeStamp.create({
    data: {
      userId: user.id,
      startTime: date,
      startPlace: place,
    },
  });
  res.status(200).json({ message: "OK" });
}

async function putTimestamp(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
) {
  const input = TimeStampSchema.safeParse(req.body);
  if (!input.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { email: session.email },
  });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  const timestamp = await prisma.timeStamp.findFirst({
    where: {
      userId: user.id,
      finishTime: null,
    },
  });
  if (!timestamp) {
    res.status(400).json({ message: "Finished word" });
    return;
  }
  const date = new Date(input.data.date);
  const place = await searchAddress(input.data.lat, input.data.lng);
  if (!place) {
    res.status(400).json({ message: "Can't get address" });
    return;
  }
  await prisma.timeStamp.update({
    where: {
      id: timestamp.id,
    },
    data: {
      finishTime: date,
      finishPlace: place,
    },
  });
  res.status(200).json({ message: "OK" });
}
