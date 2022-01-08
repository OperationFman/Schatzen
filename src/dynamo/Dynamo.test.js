import { fetchAllData, addNewUser, updatePoint, resetAllPoints, wipeAllData } from './Dynamo'

describe('Dynamo', () => {
    describe('fetchAllData', () => {
        it("fetches all data from DynamoDB", async () => {

            const mockResponse = {
                "Items": [{
                        "TONY STARK": 0,
                        "THOR": 0,
                        "STEVE ROGERS": 0,
                        "Users": "Point"
                    }],
            }


            const result = await fetchAllData();
            
            expect(result).toEqual({"TONY STARK": 3, "THOR": 5, "STEVE ROGERS": 8, "Users": "Point"});
          });
    })
})