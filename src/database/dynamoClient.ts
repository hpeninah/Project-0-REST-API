import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import 'dotenv/config';

// Set the AWS Region.
const REGION = process.env.REGION; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const ddbClient = new DynamoDBClient({ region: REGION });
export { ddbClient };