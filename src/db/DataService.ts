import { fetchAllTableData, updateAllTableData } from "./Dynamo";

export const test = async () => {
  const doStuff = await fetchAllTableData();
  return doStuff;
};

export const test2 = async (data: any) => {
  const doStuff = await updateAllTableData(data);
  return doStuff;
};

export const updateUserAndPoint = async (userName: string, point: number) => {
  const currentData = await fetchAllTableData();
  currentData[userName] = point;
  updateAllTableData(currentData);
};

export const addNewUser = async (userName: string) => {
  const upperCaseUserName = userName.toUpperCase();
  const currentData = await fetchAllTableData();
  if (currentData.hasOwnProperty(upperCaseUserName)) {
    console.log("Name Exists!");
  } else {
    updateUserAndPoint(upperCaseUserName, 0);
  }
};

export const updatePoint = async (userName: string, newPoint: number) => {
  const currentData = await fetchAllTableData();
  const upperCaseUserName = userName.toUpperCase();
  if (currentData.hasOwnProperty(upperCaseUserName)) {
    return updateUserAndPoint(userName, newPoint);
  } else {
    console.log("Cant update point");
  }
};

export const resetAllPoints = async () => {
  const currentData = await fetchAllTableData();
  for (const key in currentData) {
    if (key !== "Users") {
      currentData[key] = 0;
    }
  }
  updateAllTableData(currentData);
};

export const wipeAllData = async () => {
  const response = await updateAllTableData({ Users: "Point" });

  if (response.status === 500) {
    response["error"] = "Error: Failed to Reset the Database";
    return response;
  }
  return response;
};
