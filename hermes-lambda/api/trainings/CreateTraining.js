const AWS = require("aws-sdk");
const uuid = require("uuid");
const ddb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  const { awsRequestId } = context;
  const { requestContext, body } = event;

  if (!requestContext.authorizer) {
    return errorResponse("Authorization not configured", awsRequestId);
  }

  const trainingId = uuid.v4();
  console.log(`Received event ("${trainingId}"):`, event);
  const username = requestContext.authorizer.claims["cognito:username"];

  const requestBody = JSON.parse(body);

  console.log("Received request body: ", requestBody);

  const training = {
    trainingId: trainingId,
    coach: username,
    description: requestBody.trainingDescription,
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

  try {
    let trainingResponse = await saveTraining(training);
    console.log("Successfully saved training", trainingResponse);

    return {
      statusCode: 201,
      body: JSON.stringify(training),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (err) {
    console.error(err);
    return errorResponse(err.message, awsRequestId);
  }
};

const saveTraining = training => {
  return ddb.put({ TableName: "Trainings", Item: training }).promise();
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
