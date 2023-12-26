import { NextApiRequest, NextApiResponse } from "next";
import { withErrorHandler } from "@/server/error-handler";
import { prisma } from "@/common/prisma";
import { Session } from "@/common/session";
import { getServerSession } from "@/server/server-session";
import { TimeSearchSchema } from "@/common/time-seach-schema";
import { mapTimeStamp } from "@/common/mapper";

export default withErrorHandler(async (req, res) => {
  const session = await getServerSession(req);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "POST") {
    await postTimeSeach(req, res, session);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
});

async function postTimeSeach(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
) {
  const input = TimeSearchSchema.safeParse(req.body);
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
  const startDate = new Date(input.data.year, input.data.month - 1, 1);
  let endDate: Date;
  if (input.data.month == 12) {
    endDate = new Date(input.data.year + 1, 0, 0);
  } else {
    endDate = new Date(input.data.year, input.data.month, 1);
  }

  const times = await prisma.timeStamp.findMany({
    where: {
      userId: user.id,
      startTime: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  res.status(200).json(times.map((time) => mapTimeStamp(time)));
}
