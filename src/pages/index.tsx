import { ReactElement } from "react";
import { DashboardLayout } from "@/client/layout/common-layout";
import { TimestampPage } from "@/client/timestamp/timestamp-page";

export default function SignUp(): JSX.Element {
  return <TimestampPage />;
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
