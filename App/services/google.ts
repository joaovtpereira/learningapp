import {GoogleSignin} from '@react-native-google-signin/google-signin';

const WGCM_WEB_KEY =
  '1084790078693-q49m23jpp22vs3g975dt25sah88881bi.apps.googleusercontent.com';

export function configuration() {
  GoogleSignin.configure({
    iosClientId: '', // only for iOS
    webClientId: WGCM_WEB_KEY, // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    accountName: '', // [Android] specifies an account name on the device that should be used
    forceCodeForRefreshToken: true,
  });
}
