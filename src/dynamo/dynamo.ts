import { AWS_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_SECRET_ACCESS_KEY } from './config';
const AWS = require("aws-sdk");

AWS.config.update({
  region: AWS_DEFAULT_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "schatzen";



export const fetchAllData: any = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const result = await dynamoClient.scan(params).promise();
    return result.Items;
  } catch (error) {
    console.log(error)
  }
};

// const updateAllData = async (value) => {
//   const params = {
//     TableName: TABLE_NAME,
//     Item: value
//   }
//   return await dynamoClient.put(params).promise()
// }

// addOrUpdateCharacter({"Users": "Point", "Tony": 0});
// fetchAllData()