import {
  test,
  test2,
  addNewUser,
  updatePoint,
  resetAllPoints,
  wipeAllData,
} from "./DataService";
import { updateAllTableData } from "./Dynamo";

jest.mock("./Dynamo");

describe("Dynamo", () => {
  describe("fetchAllTableData", () => {
    it("Correctly scans and fetches all data from the table", async () => {
      // Only to show this is working, swap it out for the real function in DataService
      const expectedResult = {
        Items: [
          {
            "TONY STARK": 3,
            THOR: 5,
            "STEVE ROGERS": 8,
            Users: "Point",
          },
        ],
      };

      const result = await test();
      expect(result).toEqual(expectedResult);
    });
  });

  describe("updateAllTableData", () => {
    it("correctly updates the table", async () => {
      const func = jest.spyOn(updateAllTableData, "updateAllTableData");

      const result = await test2({ blah: "blah" });

      expect(func).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
