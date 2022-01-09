import { fetchAllDynamoTableData, updateAllDynamoTableData } from './Dynamo';

export const test = async () => {
  const doStuff = await fetchAllDynamoTableData();
  return doStuff
}

const updateUserAndPoint = async (userName: string, point: number) => {
  const currentData = await fetchAllDynamoTableData();
  currentData[userName] = point;
  updateAllDynamoTableData(currentData);
};

export const addNewUser = async (userName: string) => {
  const upperCaseUserName = userName.toUpperCase();
  const currentData = await fetchAllDynamoTableData();
  if (currentData.hasOwnProperty(upperCaseUserName)) {
    console.log("Name Exists!");
  } else {
    updateUserAndPoint(upperCaseUserName, 0);
  }
};

export const updatePoint = async (userName: string, newPoint: number) => {
  const currentData = await fetchAllDynamoTableData();
  const upperCaseUserName = userName.toUpperCase();
  if (currentData.hasOwnProperty(upperCaseUserName)) {
    return updateUserAndPoint(userName, newPoint);
  } else {
    console.log('Cant update point');
  }
};

export const resetAllPoints = async () => {
  const currentData = await fetchAllDynamoTableData();
  for (const key in currentData) {
    if (key !== "Users") {
      currentData[key] = 0;
    }
  }
  updateAllDynamoTableData(currentData);
};

export const wipeAllData = async () => {
  updateAllDynamoTableData({ "Users": "Point" });
};
