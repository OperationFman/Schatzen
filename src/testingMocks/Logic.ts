import { fetchObject } from "./APICaller";

export const addMeal = async (key: string, value: string) => {
  const currentObject: any = await fetchObject();
  currentObject[key] = value;
  return currentObject;
};
