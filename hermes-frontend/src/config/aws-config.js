export default {
  Auth: {
    region: process.env.REACT_APP_AUTH_REGION,
    userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_WEB_CLIENT_ID,
    mandatorySignIn: true,
    authenticationFlowType: "USER_SRP_AUTH"
  },
  API: {
    endpoints: [
      {
        name: process.env.REACT_APP_API_NAME,
        endpoint: process.env.REACT_APP_API_URL
      }
    ]
  },
  Storage: {
    bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    region: process.env.REACT_APP_S3_REGION
  }
};
