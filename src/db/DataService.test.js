import { fetchAllDynamoTableData } from './Dynamo'
import { test, addNewUser, updatePoint, resetAllPoints, wipeAllData } from "./DataService";

describe('Dynamo', () => {

    jest.mock('./Dynamo')

    describe('updateUserAndPoint', () => {
        it('Correctly updates the db with a user and point', async () => {
            jest.mock('./Dynamo')
            
            const response = {
                "Items": [{
                        "TONY STARK": 0,
                        "THOR": 0,
                        "STEVE ROGERS": 0,
                        "Users": "Point"
                    }],
            }

            const fetchAllDynamoTableData = jest.fn()
            fetchAllDynamoTableData.mockImplementationOnce(() => {return "blah"})

            const result = await test()
            expect(result).toEqual(123);
        })
    })
})