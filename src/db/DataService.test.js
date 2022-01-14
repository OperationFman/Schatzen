import { isPropertyAssignment } from "typescript";
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    it("Fetches all data from the mocked table", async () => {
      const result = await test();

      expect(mockFetchAllTableData).toHaveBeenCalled();
      expect(result).toEqual({ status: 200, ...testData });
    });

    it("Updates the mocked table", async () => {
      const result = await test2(testData);

      expect(result).toEqual({ status: 200, ...testData });
      expect(mockUpdateAllTableData).toHaveBeenCalledWith(testData);

      mockUpdateAllTableData.mockRestore();
    });
  });

  describe("wipeAllData", () => {
    it("Wipes db data with status 200", async () => {
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

  describe("updatePoint", () => {
    it("Updates score for an existing user", async () => {
      jest
        .spyOn(Database, "fetchAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const mockDatabase = jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      await updatePoint("THOR", 8);

      const expectedResult = {
        Items: [
          {
            Users: "Point",
            THOR: 8,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
        ],
        status: 200,
      };

      expect(mockDatabase).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe("updateUserAndPoint", () => {
    it("Inserts a user with score to the database", async () => {
      jest
        .spyOn(Database, "fetchAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      const mockDatabase = jest
        .spyOn(Database, "updateAllTableData")
        .mockResolvedValue({ status: 200, ...testData });

      await updateUserAndPoint("NEW USER", 13);

      const expected = {
        Items: [
          {
            Users: "Point",
            "NEW USER": 13,
            THOR: 3,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
        ],
        status: 200,
      };

      expect(mockDatabase).toHaveBeenCalledWith(expected);
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

      const mockoDatabase = jest.spyOn(Database, "updateAllTableData");

      await addNewUser("sPiDeR MaN");

      const expectedResult = {
        Items: [
          {
            Users: "Point",
            "SPIDER MAN": 0,
            THOR: 3,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
        ],
        status: 200,
      };

      expect(mockoDatabase).toHaveBeenCalledWith(expectedResult);
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
        status: 500,
        ...testData,
        error: "Error: Name Already Exists",
      });
    });
  });
});
