export default {
  Auth: {
    region: process.env.REACT_APP_AUTH_REGION,
    userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_WEB_CLIENT_ID,
    mandatorySignIn: true,
    authenticationFlowType: "USER_SRP_AUTH"
  }
};
