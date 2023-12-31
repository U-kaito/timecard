import { NextApiRequest, NextApiResponse } from "next";
import { EmployeeAddSchema } from "@/common/employee-schema";
import { prisma } from "@/common/prisma";
import { withErrorHandler } from "@/server/error-handler";
import { signUp } from "@/common/aws-cognito";
import { getServerSession } from "@/server/server-session";
import { mapUser } from "@/common/mapper";

export default withErrorHandler(async (req, res) => {
  const session = await getServerSession(req, true);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "GET") {
    await getEmployees(req, res);
  } else if (req.method === "POST") {
    await postEmployee(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
});

export async function getEmployees(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany();
  const times = await prisma.timeStamp.findMany({
    where: {
      finishTime: null,
    },
  });
  res.status(200).json(
    users.map((user) =>
      mapUser(
        user,
        times.find((time) => time.userId === user.id),
      ),
    ),
  );
}

export async function postEmployee(req: NextApiRequest, res: NextApiResponse) {
  const result = EmployeeAddSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  await signUp(
    result.data.email,
    result.data.password,
    `${result.data.lastName}${result.data.firstName}`,
    result.data.owner,
  );
  await prisma.pendingUser.create({
    data: {
      email: result.data.email,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      owner: result.data.owner,
      expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });
  res.status(200).json({ message: "OK" });
}
