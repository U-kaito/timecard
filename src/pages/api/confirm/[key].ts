import { NextApiRequest, NextApiResponse } from "next";
import { withErrorHandler } from "@/server/error-handler";
import { ConfirmSchema } from "@/common/confirm-schema";
import { prisma } from "@/common/prisma";
import { confirm } from "@/common/aws-cognito";

export default withErrorHandler(async (req, res) => {
  const { key } = req.query;
  if (typeof key !== "string") {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  if (req.method === "POST") {
    await postConfirm(req, res, key);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
});

async function postConfirm(
  req: NextApiRequest,
  res: NextApiResponse,
  key: string,
) {
  const result = ConfirmSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const pendingUser = await prisma.pendingUser.findUnique({
    where: { id: key },
  });
  if (!pendingUser) {
    res.status(400).json({ message: "Invalid key" });
    return;
  }

  await prisma.user.create({
    data: {
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      email: pendingUser.email,
      owner: pendingUser.owner,
    },
  });

  await confirm(pendingUser.email, result.data.confirmCode);
  res.status(200).json("OK");
}
