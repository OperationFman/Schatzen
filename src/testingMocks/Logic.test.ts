import { addMeal } from "./Logic";
jest.mock("./APICaller");

it("adds a meal to object", async () => {
  const expectedResult = {
    brunch: "pancakes",
    "afternoon tea": "tacos",
    Dinner: "Steak",
  };

  const result = await addMeal("Dinner", "Steak");

  expect(result).toEqual(expectedResult);
});
