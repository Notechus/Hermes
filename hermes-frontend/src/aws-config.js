const config = {
  aws_project_region: process.env.REACT_APP_AWS_PROJECT_REGION,
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.REACT_APP_APPSYNC_REGION,
  aws_appsync_authenticationType: process.env.REACT_APP_APPSYNC_AUTHENTICATION_TYPE,
  aws_appsync_apiKey: process.env.REACT_APP_APPSYNC_API_KEY,
  aws_cognito_identity_pool_id: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,
  aws_user_files_s3_bucket: process.env.REACT_APP_USER_FILES_S3_BUCKET,
  aws_user_files_s3_bucket_region: process.env.REACT_APP_USER_FILES_S3_BUCKET_REGION,
  aws_cloud_logic_custom: [
    {
      name: process.env.REACT_APP_HERMES_API_NAME,
      endpoint: process.env.REACT_APP_HERMES_API_ENDPOINT,
      region: process.env.REACT_APP_HERMES_API_REGION,
    },
  ],
}

export default config
