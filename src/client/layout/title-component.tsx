import { ReactNode } from "react";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export function LayoutTitle({ children }: { children: ReactNode }) {
  return <h1 css={layoutTitleStyles}>{children}</h1>;
}

function layoutTitleStyles() {
  return css`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size:;
    font-weight: normal;
    padding: 10px;
    border-bottom: 1px solid;
  `;
}
