import { GetServerSidePropsContext } from "next";
import { prisma } from "@/common/prisma";
import { ConfirmPage } from "@/client/confirm/confirm-page";

export default ConfirmPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { key } = context.query;
  if (typeof key !== "string") {
    return {
      notFound: true,
    };
  }
  const pendingUser = await prisma.pendingUser.findUnique({
    where: { id: key },
  });

  if (!pendingUser) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      key: key,
      email: pendingUser.email,
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
    },
  };
}
