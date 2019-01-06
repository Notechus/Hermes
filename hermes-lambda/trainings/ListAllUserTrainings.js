const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  console.log(`Received event ("${context.awsRequestId}"):`, event);

  if (!event.requestContext.authorizer) {
    return errorResponse(
      500,
      "Authorization not configured",
      context.awsRequestId
    );
  }
  const username = event.pathParameters.username;
  const authorizedUsername =
    event.requestContext.authorizer.claims["cognito:username"];
  if (username !== authorizedUsername) {
    return errorResponse(
      403,
      "You don't have permissions to that resource",
      context.awsRequestId
    );
  }

  console.log(`Fetching ${authorizedUsername} trainings`);

  let trainingsResponse = await fetchTrainings(
    authorizedUsername,
    context.awsRequestId
  );
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
