import {
  addNewUser,
  updatePoint,
  resetAllPoints,
  wipeAllData,
  updateUserAndPoint,
} from "./DataService";
import * as Database from "./Dynamo";

describe("Data Service", () => {
  const mockedFetchDatabase = (overrides) => {
    jest.spyOn(Database, "fetchAllTableData").mockResolvedValue({
      status: 200,
      Items: [
        {
          Users: "Point",
          THOR: 3,
          "TONY STARK": 5,
          "STEVE ROGERS": 8,
        },
      ],
      ...overrides,
    });
  };

  const mockedDatabase = (overrides) =>
    jest.spyOn(Database, "updateAllTableData").mockResolvedValue({
      status: 200,
      Items: [
        {
          Users: "Point",
          THOR: 3,
          "TONY STARK": 5,
          "STEVE ROGERS": 8,
        },
      ],
      ...overrides,
    });

  beforeEach(() => jest.resetAllMocks());

  describe("wipeAllData", () => {
    it("Wipes db data with status 200", async () => {
      const mockDatabase = mockedDatabase();

      await wipeAllData();

      expect(mockDatabase).toHaveBeenLastCalledWith({ Users: "Point" });
    });

    it("Returns status 500 and error message if wipe fails", async () => {
      mockedDatabase({ status: 500 });

      const result = await wipeAllData();

      expect(result.status).toEqual(500);
      expect(result.error).toEqual("Error: Failed to Reset the Database");
    });
  });

  describe("updatePoint", () => {
    it("Updates score for an existing user", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

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

      expect(mockDatabase).toHaveBeenLastCalledWith(expectedResult);
    });

    it("Returns an error if name doesn't exist", async () => {
      mockedFetchDatabase();
      mockedDatabase();

      const result = await updatePoint("DARRYL", 3);

      expect(result.status).toEqual(500);
      expect(result.error).toEqual(
        "Error: Could Not Update Point, Name Does Not Exist"
      );
    });
  });

  describe("updateUserAndPoint", () => {
    it("Inserts a user with score to the database", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

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

      expect(mockDatabase).toHaveBeenLastCalledWith(expected);
    });

    it("Returns an error if the user/score can't be updated", async () => {
      mockedFetchDatabase();
      mockedDatabase({ status: 500 });

      const result = await updateUserAndPoint("NEW USER", 13);

      const expected = {
        status: 500,
        error: "Error: Failed to Update the Database",
        Items: [
          {
            Users: "Point",
            THOR: 3,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
        ],
      };

      expect(result).toEqual(expected);
      expect(result.Items).not.toContain({ "NEW USER": 13 });
    });
  });

  describe("addNewUser", () => {
    it("Adds a new user in uppercase with 0 score", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

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

      expect(mockDatabase).toHaveBeenLastCalledWith(expectedResult);
    });

    it("Does NOT add a new user if they already exist", async () => {
      mockedFetchDatabase();
      mockedDatabase();

      const result = await addNewUser("Tony Stark");

      const expected = {
        status: 500,
        Items: [
          {
            Users: "Point",
            THOR: 3,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
        ],
        error: "Error: Name Already Exists",
      };

      expect(result).toEqual(expected);
    });
  });

  describe("resetAllPoints", () => {
    it("Sets every players points to 0", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

      await resetAllPoints();

      const expected = {
        status: 200,
        Items: [
          {
            Users: "Point",
            THOR: 0,
            "TONY STARK": 0,
            "STEVE ROGERS": 0,
          },
        ],
      };

      expect(mockDatabase).toHaveBeenLastCalledWith(expected);
    });
  });
});
