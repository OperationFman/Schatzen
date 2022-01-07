import * as AWS from "aws-sdk";
import { tableName } from "./config";

const docClient = new AWS.DynamoDB.DocumentClient();

export const GetDynamoData = () => {
  docClient.scan(
    {
      TableName: tableName,
    },
    (error, data) => {
      if (!error) {
        console.log(data);
      }
      console.log(error);
    }
  );
};
