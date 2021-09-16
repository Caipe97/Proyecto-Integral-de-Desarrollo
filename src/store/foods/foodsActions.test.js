import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

import * as actions from "./foodsActions";

import {
    GET_ALL_FOODS_PENDING,
    GET_ALL_FOODS_SUCCESS,
    GET_ALL_FOODS_FAILED
   } from './foodsConstants'

const mockStore = configureMockStore([thunkMiddleware]);

describe("get all foods actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting getAllFoods API", () => {
        const expectedAction = {
            type: GET_ALL_FOODS_PENDING,
        };
        store.dispatch(actions.getAllFoods());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for getAllFoods", () => {
        // fetch.mockResponseOnce(JSON.stringify({mealId: 31, foodName: 'milas', gramAmount: 100, userId: 2, dateEaten: '2021-09-09T00:00:00.000Z'}));
        fetch.mockResponseOnce(JSON.stringify([
            {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'},
            {foodId: 2, name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, createdAt: '2021-09-15T20:02:16.490Z'}
        ]))

        const expectedActions = [
            { type: GET_ALL_FOODS_PENDING },
            { 
                type: GET_ALL_FOODS_SUCCESS,
                payload: [
                    {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'},
                    {foodId: 2, name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, createdAt: '2021-09-15T20:02:16.490Z'}
                ]
            }
        ];

        store.dispatch(actions.getAllFoods())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for getAllFoods", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: GET_ALL_FOODS_PENDING },
        {
            type: GET_ALL_FOODS_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.getAllFoods())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})