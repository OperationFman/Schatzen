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

  if (currentData.status === 500) {
    currentData["error"] = "Error: Failed to Read the Database";
    return currentData;
  }

  currentData.Items[0][userName] = point;

  const response = await updateAllTableData(currentData);

  if (response.status === 500) {
    response["error"] = "Error: Failed to Update the Database";
    return response;
  }
  return response;
};

export const addNewUser = async (userName: string) => {
  const upperCaseUserName = userName.toUpperCase();
  const currentData = await fetchAllTableData();

  if (currentData.Items[0].hasOwnProperty(upperCaseUserName)) {
    currentData["error"] = "Error: Name Already Exists";
    currentData.status = 500;
    return currentData;
  } else {
    return await updateUserAndPoint(upperCaseUserName, 0);
  }
};

export const updatePoint = async (userName: string, newPoint: number) => {
  const currentData = await fetchAllTableData();

  if (!currentData.Items[0].hasOwnProperty(userName)) {
    currentData["error"] = "Error: Could Not Update Point, Name Does Not Exist";
    currentData.status = 500;
    return currentData;
  } else {
    currentData.Items[0][userName] = newPoint;
    return await updateUserAndPoint(userName, newPoint);
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

  if (response.status === 200) {
    return response;
  }
  response["error"] = "Error: Failed to Reset the Database";
  return response;
};
