import { ReactNode } from "react";
import { LayoutNav, NavItem } from "@/client/layout/nav-component";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { LayoutTitle } from "@/client/layout/title-component";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

const navItems = [
  {
    href: "/",
    title: "勤怠管理",
    icon: <AccessTimeOutlinedIcon />,
    ownerOnly: false,
  },
  {
    href: "/employees",
    title: "従業員",
    icon: <BadgeOutlinedIcon />,
    ownerOnly: true,
  },
  {
    href: "/check",
    title: "出勤時間",
    icon: <AssessmentOutlinedIcon />,
    ownerOnly: false,
  },
] as NavItem[];

export function CommonLayout({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const selected = navItems.find((item) => item.href === router.pathname);
  const hasIconAndTitle = icon && title;

  return (
    <div css={commonLayoutStyles}>
      <LayoutNav items={navItems} />
      <main className="CommonLayout-Main">
        {hasIconAndTitle && (
          <LayoutTitle>
            {icon}
            {title}
          </LayoutTitle>
        )}
        {!hasIconAndTitle && selected && (
          <LayoutTitle>
            {selected.icon}
            {selected.title}
          </LayoutTitle>
        )}
        <div className="CommonLayout-Children">{children}</div>
      </main>
    </div>
  );
}

function commonLayoutStyles() {
  return css`
    display: flex;
    min-height: 100vh;
    max-width: 100vw;

    .CommonLayout-Main {
      flex-grow: 1;
      padding: 2rem;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .CommonLayout-Children {
      padding: 5px 10px;
      height: 100%;
      flex-grow: 1;
    }
  `;
}
