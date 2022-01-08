import { AWS_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_SECRET_ACCESS_KEY } from './config';
const AWS = require("aws-sdk");

AWS.config.update({
  region: AWS_DEFAULT_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "schatzen";

const updateAllData = async (newData: any) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {...newData}
  }
  // Add Try/Catch
  return await dynamoClient.put(params).promise()
}

const updateUserAndPoint = async (userName: string, point: number) => {
  const currentData = await fetchAllData()
  
  currentData[userName] = point;

  updateAllData(currentData);
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

export const addNewUser = async (userName: string) => {
  const upperCaseUserName = userName.toUpperCase()
  const currentData = await fetchAllData();

  if (currentData.hasOwnProperty(upperCaseUserName)) {
    console.log("Name Exists!")
  } else {
    updateUserAndPoint(upperCaseUserName, 0);
  }
}

export const updatePoint = async (userName: string, newPoint: number) => {
  const currentData = await fetchAllData();
  const upperCaseUserName = userName.toUpperCase();

  if (currentData.hasOwnProperty(upperCaseUserName)) {
    return updateUserAndPoint(userName, newPoint);
  } else {
    console.log('Cant update point')
  }
}

export const resetAllPoints = async () => {
  const currentData = await fetchAllData();

  for (const key in currentData) {
    if (key !== "Users") {
      currentData[key] = 0;
    }
  }
  
  updateAllData(currentData);
}

export const wipeAllData = async () => {
  updateAllData({"Users": "Point"})
}