import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "@/pages/confirm/[key]";
import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useConfirm } from "@/client/confirm/confirm-hook";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { FloatLayout } from "@/client/layout/float-layout";

export function ConfirmPage({
  confirmKey,
  email,
  firstName,
  lastName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [confirmCode, setconfirmCode] = useState("");
  const { success, loading, confirm } = useConfirm(confirmKey);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.push("/login");
    }
  }, [router, success]);

  return (
    <form onSubmit={(e) => e.preventDefault()} css={confirmPageStyles()}>
      <TextField label="メールアドレス" type="email" value={email} disabled />
      <TextField label="苗字" type="text" value={lastName} disabled />
      <TextField label="名前" type="text" value={firstName} disabled />
      <TextField
        label="認証コード"
        type="confirmCode"
        value={confirmCode}
        onChange={(e) => setconfirmCode(e.target.value)}
      />
      <button
        className="ConfirmPage-Button"
        onClick={() => confirm(confirmCode)}
      >
        サインアップ
        {loading && (
          <CircularProgress size={20} className="ConfirmPage-Progress" />
        )}
      </button>
    </form>
  );
}

ConfirmPage.Layout = FloatLayout;

function confirmPageStyles() {
  return css`
    background-color:;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    width: 350px;
    border-radius: 10px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .ConfirmPage-Button {
      border: 1px solid;
      border-radius: 5px;
      background: transparent;
      padding: 10px 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      .LoginPage-Progress {
        position: absolute;
        right: 60px;
      }

      &:hover {
        border: 1px solid;
        background-color:;
        color:;

        .ConfirmPage-Progress {
          color:;
        }
      }
    }
  `;
}
