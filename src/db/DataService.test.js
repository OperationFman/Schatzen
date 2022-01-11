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
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    it("Correctly wipes db data with status 200", async () => {
      jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const result = await wipeAllData();

      expect(result.status).toEqual(200);
      expect(result.Items[0]).toEqual(testData.Items[0]);
    });

    it("Returns a status 500 and console logs an error", async () => {
      jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 500 });

      const result = await wipeAllData();

      expect(result.status).toEqual(500);
      expect(result.error).toEqual("Error: Failed to Reset the Database");
    });
  });

  describe("addNewUser", () => {});
});
