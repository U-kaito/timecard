import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoAccessToken } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.AWS_USER_POOL_ID as string,
    ClientId: process.env.AWS_CLIENT_ID as string,
};

function getUserPool() {
    return new CognitoUserPool(poolData);
}

export async function signUp(username: string, password: string, ){
    //todo:名前とロールの設定を行う
    await getUserPool().signUp(username, password, [], [], (err, result) => {
        if (err) {
            console.log(err)
          return;
        } else {
            console.log(result)
          alert(
            "登録したメールアドレスへアクティベーション用のリンクを送付しました。"
          );
        }
      });
}

export async function confirm(username: string, confirmCode: string){
    const userData = {
        Username: username,
        Pool: getUserPool(),
    };

    const cognitoUser = new CognitoUser(userData);
    await cognitoUser.confirmRegistration(confirmCode, true, function(err, result) {
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
		}
		console.log('call result: ' + result);
	});
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
    await cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
        console.log('ログイン成功');
        //アクセストークンを返すようにする
        return session.getAccessToken().getJwtToken();
        },
        onFailure: (err) => {
        console.error('ログイン失敗', err);
        }
    });
}

export async function logout() {
    const cognitoUser = await getUserPool().getCurrentUser();

    if (cognitoUser) {
        await cognitoUser.signOut();
    }
}