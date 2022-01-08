import { AWS_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_SECRET_ACCESS_KEY } from './config';
const AWS = require("aws-sdk");

AWS.config.update({
  region: AWS_DEFAULT_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "schatzen";

const updateAllData = async (userName: string, point: number) => {
  const currentData = await fetchAllData()
  
  currentData[userName] = point;

  const params = {
    TableName: TABLE_NAME,
    Item: {...currentData}
  }
  // Add Try/Catch
  return await dynamoClient.put(params).promise()
}

export const fetchAllData = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const result = await dynamoClient.scan(params).promise();
    return result.Items[0];
  } catch (error) {
    console.log(error)
  }
};

export const addNewUser = async (name: string) => {
  const newUser = name.toUpperCase()
  const currentData = await fetchAllData();
  // Add to bigass key to localstorage

  if (currentData.hasOwnProperty(newUser)) {
    console.log("Name Exists!")
  } else {
    // Add Try/Catch
    updateAllData(newUser, -1);
  }
}

export const updatePoint = async (userName: string, newPoint: number) => {
  const currentData = await fetchAllData();

  if (currentData.hasOwnProperty(userName)) {
    return updateAllData(userName, newPoint);
  } else {
    console.log('Cant update point')
  }
}
