const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  const { awsRequestId } = context;
  const { requestContext, pathParameters } = event;
  console.log(`Received event ("${awsRequestId}"):`, event);

  if (!requestContext.authorizer) {
    return errorResponse(500, "Authorization not configured", awsRequestId);
  }
  const username = requestContext.authorizer.claims["cognito:username"];
  const statisticsName = pathParameters.name;

  console.log(`Fetching ${statisticsName} statistics for ${username}`);

  let trainingsResponse = await fetchNextTraining(username, awsRequestId);
  console.log("trainings records", trainingsResponse);

  let statistics = {
    title: "",
    data: {},
    time: new Date().toISOString()
  };

  return trainingsResponse;
};

const fetchNextTraining = (username, awsRequestId) => {
  return ddb
    .query({
      TableName: "Trainings",
      FilterExpression: "Runner = :r",
      ExpressionAttributeValues: { ":r": username }
    })
    .promise()
    .then(trainings => {
      console.log("Successfully fetched trainings:", trainings);
      return {
        statusCode: 200,
        body: JSON.stringify(trainings),
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
    })
    .catch(err => {
      console.error(err);
      return errorResponse(500, err.message, awsRequestId);
    });
};

const errorResponse = (code, errorMessage, awsRequestId) => {
  return {
    statusCode: code,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId
    }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};
