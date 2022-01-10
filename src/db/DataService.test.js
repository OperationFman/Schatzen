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
  describe("mock tests", () => {
    const mockFetchAllTableData = jest
      .spyOn(Database, "fetchAllTableData")
      .mockResolvedValue({ status: 200, ...testData });

    const mockUpdateAllTableData = jest
      .spyOn(Database, "updateAllTableData")
      .mockResolvedValue({ status: 200, ...testData });

    it("Correctly fetches all data from the mocked table", async () => {
      const result = await test();

      expect(mockFetchAllTableData).toHaveBeenCalled();
      expect(result).toEqual({ status: 200, ...testData });
    });

    it("Correctly updates the mocked table", async () => {
      const result = await test2(testData);

      expect(result).toEqual({ status: 200, ...testData });
      expect(mockUpdateAllTableData).toHaveBeenCalledWith(testData);

      mockUpdateAllTableData.mockRestore();
    });
  });

  describe("wipeAllData", () => {
    // it(works)
    // Setup mock for updateAllTableData, it returns {status: 200 + the testData}
    // call wipeAllData
    // Assert response contains status 500
    // Assert response contains testData
    //it(error)
    // Setup mock for updateAllTableData, it returns {status: 500}
    // call wipeAllData
    // Assert response contains status 500
    // Assert console.log was called with an error message
  });
});
