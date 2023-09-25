import { css } from "@emotion/react"
import { ReactNode } from "react"

export function DashboardLayout({ children }: { children: ReactNode }): ReactNode {
  return (
  <div css={DashboardStyles}>
    <header className="DashboardLayout-Header">
        <h1>出退勤管理システム</h1>
    </header>
    {children}
  </div>
  )
}

function DashboardStyles(){
    return css`
        margin: auto;
        height: 100vh;
        display: grid;
        place-items: center;

        .DashboardLayout-Header{
            background-color: lightblue;
            width: 100%;
            height: 100px;
            position: fixed;
            top: 0;
        }

        .DashboardLayout-Header h1 {
            font-size: 30px;
            color: white;
            padding: 10px;
            text-align: center; 
          }
    `
}