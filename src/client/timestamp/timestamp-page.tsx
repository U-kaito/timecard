import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useSession } from "@/client/session/session-hook";
import { deleteCookie } from "cookies-next";

export function TimestampPage() {
  const { loading, session } = useSession();
  return (
    <div css={TimestampPageStyles}>
      <div className="name">
        {loading ? <p>ようこそ</p> : <p>ようこそ {session?.username} 様</p>}
      </div>
      <div className="button-container">
        <button className="attendance-button green">出勤</button>
        <button className="attendance-button red">退勤</button>
      </div>
    </div>
  );
}

function TimestampPageStyles() {
  return css`
    .name {
      text-align: center;
      font-size: 20px;
      margin-bottom: 50px;
    }
    .button-container {
      display: flex; /* ボタンを横並びに配置 */
      justify-content: space-between; /* ボタンを均等に配置 */
      gap: 20px;
    }

    /* 共通のボタンスタイル */
    .attendance-button {
      padding: 30px 60px;
      border: none;
      cursor: pointer;
      font-size: 20px;
      border-radius: 10px;
    }

    /* "出勤" ボタンのスタイル */
    .green {
      background-color: green;
      color: white;
    }

    /* "退勤" ボタンのスタイル */
    .red {
      background-color: red;
      color: white;
    }
  `;
}
