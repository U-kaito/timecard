import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID as string,
  ClientId: process.env.AWS_CLIENT_ID as string,
};

function getUserPool() {
  return new CognitoUserPool(poolData);
}

export async function signUp(username: string, password: string) {
  //todo:名前とロールの設定を行う
  await getUserPool().signUp(username, password, [], [], (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(result);
      alert(
        "登録したメールアドレスへアクティベーション用のリンクを送付しました。",
      );
    }
  });
}

export async function confirm(username: string, confirmCode: string) {
  const userData = {
    Username: username,
    Pool: getUserPool(),
  };

  const cognitoUser = new CognitoUser(userData);
  await cognitoUser.confirmRegistration(
    confirmCode,
    true,
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
    },
  );
}

export async function login(username: string, password: string) {
  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: getUserPool(),
  };

  const cognitoUser = new CognitoUser(userData);
  try {
    const session: CognitoUserSession = await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => resolve(session),
        onFailure: (err) => reject(err),
      });
    });

    console.log("ログイン成功");
    // アクセストークンを返す
    return session.getAccessToken().getJwtToken();
  } catch (error) {
    console.error("ログイン失敗", error);
    return undefined;
  }
}

export async function logout() {
  const cognitoUser = await getUserPool().getCurrentUser();

  if (cognitoUser) {
    await cognitoUser.signOut();
  }
}
