import { UserPayload } from './DataServiceModels';
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


export const fetchAllTableData = async (): Promise<UserPayload> => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const result = await dynamoClient.scan(params).promise();
    const format = result.Items[0];
    return { Items: format, error: undefined}
  } catch (error) {
    return { Items: undefined, error: "Could Not Fetch From Database" };
  }
};

export const updateAllTableData = async (newData: UserPayload): Promise<UserPayload> => {
  const params = {
    TableName: TABLE_NAME,
    Item: { ...newData.Items },
  };

  try {
    await dynamoClient.put(params).promise();
    return await fetchAllTableData();
  } catch (error) {
    return { Items: undefined, error: "Could Not Update Database" };
  }
};
