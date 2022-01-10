import {
  test,
  test2,
  addNewUser,
  updatePoint,
  resetAllPoints,
  wipeAllData,
} from "./DataService";
import * as Database from "./Dynamo";

describe("Dynamo", () => {
  describe("mock tests", () => {
    const testData = {
      Items: [
        {
          Users: "Point",
          THOR: 3,
          "TONY STARK": 5,
          "STEVE ROGERS": 8,
        },
      ],
    };
    it("Correctly fetches all data from the mocked table", async () => {
      const spy = jest
        .spyOn(Database, "fetchAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const result = await test();

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual({ status: 200, ...testData });
    });

    it("Correctly updates the mocked table", async () => {
      const spy = jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const result = await test2(testData);

      expect(result).toEqual({ status: 200, ...testData });
      expect(spy).toHaveBeenCalledWith(testData);

      spy.mockRestore();
    });
  });
});
