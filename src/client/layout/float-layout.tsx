import { ReactNode } from "react";
import { css } from "@emotion/react";

export function FloatLayout({ children }: { children: ReactNode }) {
  return (
    <main css={floatLayoutStyles}>
      <div className="FloatLayout-Background" />
      {children}
    </main>
  );
}

function floatLayoutStyles() {
  return css`
    margin: auto;
    height: 100vh;
    display: grid;
    place-items: center;

    .FloatLayout-Background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(120deg, #87d3f5 20%, #1c7db9 90%);
      z-index: -1;
    }
  `;
}
