/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    endpoint:"https://8000-piyuxx-policiess-6dvp5s05n36.ws-us105.gitpod.io"
});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "MyTable";

export const l = async (event, context) => {
    try {
        
          const body = await dynamo.send(
            new GetCommand({
              TableName: tableName,
              Key: {
                id: parseInt(event.pathParameters.id),
              },
            })
          );
          // body = body.Item;
   
        return {
            statusCode: 200,
            body: JSON.stringify(body.Item)
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
