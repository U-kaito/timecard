import Link from "next/link";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { ReactNode, useCallback } from "react";
import { useRouter } from "next/router";
import { useSession } from "@/client/session/session-hook";
import { deleteCookie } from "cookies-next";

export interface NavItem {
  href: string;
  matches?: (string | RegExp)[];
  title: string;
  icon: ReactNode;
  ownerOnly?: boolean;
}

export function LayoutNav({ items }: { items: NavItem[] }) {
  const router = useRouter();
  const { session, refresh } = useSession();
  const selected = items.find(
    (item) =>
      item.href === router.pathname ||
      item.matches?.some((it) => router.pathname.match(it)),
  );

  const logout = useCallback(() => {
    deleteCookie("_token");
    refresh();
    router.push("/login");
  }, [refresh, router]);

  return (
    <nav css={layoutNavStyles}>
      {session && (
        <>
          <div>
            {items
              .filter((item) => !item.ownerOnly || session.owner)
              .map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`LayoutNav-Row ${
                    selected == item && "LayoutNav-SelectedRow"
                  }`}
                >
                  {item.icon}
                  <p>{item.title}</p>
                </Link>
              ))}
          </div>
          <div>
            <button className="LayoutNav-Logout" onClick={logout}>
              <p className="LayoutNav-LogoutText">ログアウトはこちら</p>
            </button>
          </div>
        </>
      )}
    </nav>
  );
}

function layoutNavStyles() {
  return css`
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    border-right: 1px solid;
    white-space: nowrap;
    background-color:;

    .LayoutNav-Row {
      display: flex;
      align-items: center;
      text-decoration: none;
      color:;
      gap: 1rem;
      transition: color 0.2s ease-in-out;

      &:hover {
        color:;
      }
    }

    .LayoutNav-SelectedRow {
      color:;
    }

    .LayoutNav-Logout {
      border: 1px solid;
      background-color:;
      border-radius: 3px;
      padding: 5px 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: border 0.2s ease-in-out;

      &:hover {
        border: 1px solid;
      }
    }

    .LayoutNav-LogoutText {
      margin: 0;
    }
  `;
}
