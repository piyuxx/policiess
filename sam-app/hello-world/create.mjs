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
    endpoint:"https://8000-piyuxx-policiess-h3ys5erlv1r.ws-us105.gitpod.io"
});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "MyTable";

export const lambdaHandler = async (event, context) => {
    try {
        const body=JSON.parse(event.body)
        await dynamo.send(
            new PutCommand({
                TableName:tableName,
                Item:{
                    id:parseInt(body.id),
                    name:body.name,
                }
            })
        )
        return {
            headers: {
                // You can add CORS headers here if you're not handling CORS at the API Gateway level
                "Access-Control-Allow-Origin": "*", // Adjust this to limit to specific origins in production
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept":'*/*',
                "Content-Type":'application/json'
      
              },
            'statusCode': 200,
             body
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};