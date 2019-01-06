const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  if (!event.requestContext.authorizer) {
    return errorResponse("Authorization not configured", context.awsRequestId);
  }

  console.log(`Received event ("${context.awsRequestId}"):`, event);
  const username = event.requestContext.authorizer.claims["cognito:username"];

  console.log(`Fetching ${username} trainings`);

  let trainingsResponse = await fetchTrainings(username, context.awsRequestId);
  console.log("trainings records", trainingsResponse);

  return trainingsResponse;
};

const fetchTrainings = (username, awsRequestId) => {
  return ddb
    .scan({
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
      return errorResponse(err.message, awsRequestId);
    });
};

const errorResponse = (errorMessage, awsRequestId) => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId
    }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};
