import {
  addNewUser,
  updatePoint,
  resetAllPoints,
  wipeAllData,
  updateUserAndPoint,
  fetchRawTableData
} from "./DataService";
import * as Database from "./Dynamo";

describe("Data Service", () => {
  const mockedFetchDatabase = (overrides) => {
    jest.spyOn(Database, "fetchAllTableData").mockResolvedValue(
      {
        "Items": {
          "THOR": 3,
          "TONY STARK": 5,
          "STEVE ROGERS": 8,
          "Users": "Point"
        },
        error: undefined,
        ...overrides
      }
    );
  };

  const mockedDatabase = (overrides) =>
    jest.spyOn(Database, "updateAllTableData").mockResolvedValue(
      {
        "Items": {
          "THOR": 3,
          "TONY STARK": 5,
          "STEVE ROGERS": 8,
          "Users": "Point"
        },
        error: undefined,
        ...overrides
      }
    );

  beforeEach(() => jest.resetAllMocks());

  describe("updateUserAndPoint", () => {
    it("Inserts a user with score to the database", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

      await updateUserAndPoint("NEW USER", 13);

      const expected = {
        Items:  {
            Users: "Point",
            "NEW USER": 13,
            THOR: 3,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
      };

      expect(mockDatabase).toHaveBeenLastCalledWith(expected);
    });

    it("Returns an error if the userAndPoint can't be updated", async () => {
      mockedFetchDatabase();
      mockedDatabase({error: "Error: Failed to Update the Database"});

      const result = await updateUserAndPoint("NEW USER", 13);

      expect(result.error).toEqual("Error: Failed to Update the Database");
      expect(result.Items).not.toContain({ "NEW USER": 13 });
    });


  });
  
  describe("addNewUser", () => {
    it("Adds a new user in uppercase with 0 score", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

      await addNewUser("sPiDeR MaN");

      const expectedResult = {
        Items: 
          {
            Users: "Point",
            "SPIDER MAN": 0,
            THOR: 3,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
      };

      expect(mockDatabase).toHaveBeenLastCalledWith(expectedResult);
    });

    it("Does NOT add a new user if they already exist", async () => {
      mockedFetchDatabase();
      mockedDatabase({error: "Error: Name Already Exists"});

      const result = await addNewUser("Tony Stark");

      const expected = {
        Items: 
          {
            Users: "Point",
            THOR: 3,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
        error: "Error: Name Already Exists",
      };

      expect(result).toEqual(expected);
    });

    it("Returns an error message if database can't be updated", async () => {
      mockedFetchDatabase();
      mockedDatabase({error: "Could Not Update Database"});

      const result = await addNewUser("sPiDeR MaN");

      expect(result.error).toEqual("Could Not Update Database");
    });
  });

  describe("updatePoint", () => {
    it("Updates score for an existing user", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

      await updatePoint("THOR", 8);

      const expectedResult = {
        Items: 
          {
            Users: "Point",
            THOR: 8,
            "TONY STARK": 5,
            "STEVE ROGERS": 8,
          },
      };

      expect(mockDatabase).toHaveBeenLastCalledWith(expectedResult);
    });

    it("Returns an error if name doesn't exist", async () => {
      mockedFetchDatabase();
      mockedDatabase();

      const result = await updatePoint("DARRYL", 3);

      expect(result.error).toEqual(
        "Error: Could Not Update Point, Name Does Not Exist"
      );
    });

    it("Returns an error message if database can't be updated", async () => {
      mockedFetchDatabase();
      mockedDatabase({error: "Could Not Update Database"});

      const result = await updatePoint("THOR", 8);

      expect(result.error).toEqual("Could Not Update Database");
    });
  });
  
  describe("resetAllPoints", () => {
    it("Sets every players points to 0", async () => {
      mockedFetchDatabase();
      const mockDatabase = mockedDatabase();

      await resetAllPoints();

      const expected = {
        Items: 
          {
            Users: "Point",
            THOR: 0,
            "TONY STARK": 0,
            "STEVE ROGERS": 0,
          },
      };

      expect(mockDatabase).toHaveBeenLastCalledWith(expected);
    });

    it("Returns an error message if database can't be updated", async () => {
      mockedFetchDatabase();
      mockedDatabase({error: "Could Not Update Database"});

      const result = await resetAllPoints();

      expect(result.error).toEqual("Could Not Update Database");
    });
  });

  describe("wipeAllData", () => {
    it("Wipes db", async () => {
      const mockDatabase = mockedDatabase();

      await wipeAllData();

      expect(mockDatabase).toHaveBeenLastCalledWith({ Users: "Point" });
    });

    it("Returns an error message if database can't be updated", async () => {
      mockedDatabase({error: "Could Not Update Database"});

      const result = await wipeAllData();

      expect(result.error).toEqual("Could Not Update Database");
    });
  });

  describe("fetchRawTableData", () => {
    it('Gets raw data from database', async () => {
       mockedFetchDatabase()

      const result = await fetchRawTableData()

      expect(result).toEqual({
        "Items": {
          "THOR": 3,
          "TONY STARK": 5,
          "STEVE ROGERS": 8,
          "Users": "Point"
        },
        error: undefined
      });
    })

    it("Returns an error message if database can't be reached", async () => {
      mockedFetchDatabase({error: "Could Not Update Database"});

      const result = await fetchRawTableData();

      expect(result.error).toEqual("Could Not Update Database");
    }); 
  })
});
