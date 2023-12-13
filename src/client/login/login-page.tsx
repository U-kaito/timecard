import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLogin } from "@/client/login/login-hook";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useSession } from "@/client/session/session-hook";
import { FloatLayout } from "@/client/layout/float-layout";
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { success, error, loading, login } = useLogin();
  const router = useRouter();
  const { refresh } = useSession();

  useEffect(() => {
    if (success) {
      refresh();
      router.push("/");
    }
  }, [refresh, router, success]);

  return (
    <form onSubmit={(e) => e.preventDefault()} css={loginPageStyles(error)}>
      <TextField
        label="メールアドレス"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="LoginPage-Button"
        onClick={() => login(email, password)}
      >
        ログインする
        {loading && (
          <CircularProgress size={20} className="LoginPage-Progress" />
        )}
      </button>
    </form>
  );
}

LoginPage.Layout = FloatLayout;

function loginPageStyles(error: boolean) {
  return css`
    background-color:;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    width: 350px;
    border-radius: 10px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .LoginPage-Button {
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

        .LoginPage-Progress {
          color:;
        }
      }
    }
  `;
}
