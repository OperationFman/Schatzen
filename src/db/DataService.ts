import { UserPayload } from './DataServiceModels';
import { fetchAllTableData, updateAllTableData } from "./Dynamo";

export const updateUserAndPoint = async (userName: string | undefined, point: number): Promise<UserPayload> => {
  const currentData: UserPayload = await fetchAllTableData();

  // @ts-ignore 
  currentData.Items[userName] = point;

  const response = await updateAllTableData(currentData);

  return response;
};

export const addNewUser = async (userName: string): Promise<UserPayload> => {
  const upperCaseUserName = userName.toUpperCase();
  const currentData = await fetchAllTableData();

  // @ts-ignore 
  if (currentData.Items.hasOwnProperty(upperCaseUserName)) {
    currentData.error = "Error: Name Already Exists";
    return currentData;
  } else {
    return await updateUserAndPoint(upperCaseUserName, 0);
  }
};

export const updatePoint = async (userName: string, newPoint: number): Promise<UserPayload> => {
  const currentData = await fetchAllTableData();

  // @ts-ignore 
  if (!currentData.Items.hasOwnProperty(userName)) {
    currentData.error = "Error: Could Not Update Point, Name Does Not Exist";
    return currentData;
  } else {
    // @ts-ignore 
    currentData.Items[userName] = newPoint;
    return await updateUserAndPoint(userName, newPoint);
  }
};

export const resetAllPoints = async (): Promise<UserPayload> => {
  const currentData = await fetchAllTableData();

  for (const key in currentData.Items) {
    if (key !== "Users") {
      // @ts-ignore 
      currentData.Items[key] = 0;
    }
  }
  return updateAllTableData(currentData);
};

export const wipeAllData = async () => {
  // @ts-ignore 
  const response = await updateAllTableData({ Users: "Point" });

  return response;
};

export const fetchRawTableData = async (): Promise<UserPayload> => {
  return await fetchAllTableData();
}
