import {
  test,
  test2,
  addNewUser,
  updatePoint,
  resetAllPoints,
  wipeAllData,
  updateUserAndPoint,
} from "./DataService";
import * as Database from "./Dynamo";

describe("Data Service", () => {
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

  describe("updateUserAndPoint", () => {
    it("Inserts a user with score to the database", async () => {
      jest
        .spyOn(Database, "fetchAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const mockDatabase = jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 200, ...testData, "NEW USER": 13 });

      await updateUserAndPoint("NEW USER", 13);

      expect(mockDatabase).toHaveBeenCalledWith({
        status: 200,
        ...testData,
        "NEW USER": 13,
      });
    });

    it("Returns an error if the user/score can't be updated", async () => {
      jest
        .spyOn(Database, "fetchAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 500, ...testData });

      const result = await updateUserAndPoint("NEW USER", 13);

      expect(result).toEqual({
        status: 500,
        error: "Error: Failed to Update the Database",
        ...testData,
      });
      expect(result.Items).not.toContain({ "NEW USER": 13 });
    });
  });

  describe("addNewUser", () => {
    it("Adds a new user in uppercase with 0 score", async () => {
      jest
        .spyOn(Database, "fetchAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const mockDatabase = jest.spyOn(Database, "updateAllTableData");

      await addNewUser("sPiDeR MaN");

      expect(mockDatabase).toHaveBeenCalledWith({
        status: 200,
        ...testData,
        "SPIDER MAN": 0,
      });
    });

    it("Does NOT add a new user if they already exist", async () => {
      jest
        .spyOn(Database, "fetchAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const result = await addNewUser("Tony Stark");

      expect(result).toEqual({
        status: 200,
        ...testData,
        error: "Error: Name Already Exists",
      });
    });
  });
});
