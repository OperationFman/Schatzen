import {
  AWS_ACCESS_KEY,
  AWS_DEFAULT_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "./keys";
const AWS = require("aws-sdk");

AWS.config.update({
  region: AWS_DEFAULT_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "schatzen";

export const updateAllTableData = async (newData: any) => {
  const params = {
    TableName: TABLE_NAME,
    Item: { ...newData },
  };

  try {
    const result = await dynamoClient.put(params).promise();
    return { status: 200, ...result };
  } catch (error) {
    return { status: 500 };
  }
};

export const fetchAllTableData = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const result = await dynamoClient.scan(params).promise();
    return result.Items[0];
  } catch (error) {
    return { status: 500 };
  }
};
