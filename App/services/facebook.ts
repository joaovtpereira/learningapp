import {AccessToken, LoginManager} from 'react-native-fbsdk';

const FACEBOOK_GET_USER_URL =
  'https://graph.facebook.com/v2.5/me?fields=id,email,name,link,first_name,last_name,picture.type(large)&access_token=';

export function logInWithReadPermissions() {
  if (AccessToken.getCurrentAccessToken() != null) {
    LoginManager.logOut();
  }

  const facebookLogin = LoginManager.logInWithPermissions([
    'email',
    'public_profile',
  ]).then(
    function (result: any) {
      console.log({result: result});

      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        console.log(
          'Login was successful with permissions: ' +
            result.grantedPermissions.toString(),
        );
        return result;
      }
    },
    function (error) {
      console.log('Login failed with error: ' + error);
    },
  );
  return facebookLogin;
}

export function getUserInformation() {
  const facebookUser = AccessToken.getCurrentAccessToken().then((data: any) => {
    const {accessToken} = data;
    return fetch(FACEBOOK_GET_USER_URL + accessToken).then(response =>
      response.json(),
    );
  });

  return facebookUser;
}
