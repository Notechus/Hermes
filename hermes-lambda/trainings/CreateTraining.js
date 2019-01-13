const AWS = require("aws-sdk");
const uuid = require("uuid");
const ddb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  if (!event.requestContext.authorizer) {
    return errorResponse("Authorization not configured", context.awsRequestId);
  }

  const trainingId = uuid.v4();
  console.log(`Received event ("${trainingId}"):`, event);
  const username = event.requestContext.authorizer.claims["cognito:username"];

  const requestBody = JSON.parse(event.body);

  console.log("Received request body: ", requestBody);

  const training = {
    trainingId: trainingId,
    coach: username,
    description: requestBody.description,
    runner: requestBody.runner,
    trainingDate: requestBody.trainingDate,
    creationDate: new Date().toISOString(),
    coachNotes: requestBody.coachNotes !== "" ? requestBody.coachNotes : "-",
    activities: requestBody.activities,
    importance: requestBody.importance,
    intensity: requestBody.intensity,
    completed: false
  };

  console.log("Saving training: ", training);

  let response = await saveTraining(training, context.awsRequestId);
  console.log("put record", response);

  return response;
};

const saveTraining = (training, awsRequestId) => {
  return ddb
    .put({ TableName: "Trainings", Item: training })
    .promise()
    .then(() => {
      console.log("Successfully saved training");
      return {
        statusCode: 201,
        body: JSON.stringify(training),
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
