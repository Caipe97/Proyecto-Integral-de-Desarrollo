import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

import * as actions from "./foodsActions";

import {
    GET_ALL_FOODS_PENDING,
    GET_ALL_FOODS_SUCCESS,
    GET_ALL_FOODS_FAILED,
    ADD_CUSTOM_FOOD_PENDING,
    ADD_CUSTOM_FOOD_SUCCESS,
    ADD_CUSTOM_FOOD_FAILED,
    EDIT_CUSTOM_FOOD_PENDING,
    EDIT_CUSTOM_FOOD_SUCCESS,
    EDIT_CUSTOM_FOOD_FAILED,
    DELETE_CUSTOM_FOOD_PENDING,
    DELETE_CUSTOM_FOOD_SUCCESS,
    DELETE_CUSTOM_FOOD_FAILED,
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

    it("should handle requesting addCustomFoodPending API", () => {
        const expectedAction = {
            type: ADD_CUSTOM_FOOD_PENDING,
        };
        store.dispatch(actions.addCustomFood('pollo',123,123,1));
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for addCustomFood", () => {
        fetch.mockResponseOnce(JSON.stringify([
            {name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, userId:1},
            {name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, userId:1}
        ]))

        const expectedActions = [
            { type: ADD_CUSTOM_FOOD_PENDING },
            { 
                type: ADD_CUSTOM_FOOD_SUCCESS,
                payload: [
                    {name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, userId:1},
                    {name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, userId:1}   
                ]
            }
        ];

        store.dispatch(actions.addCustomFood('Papa',200, 100, 1))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for addCustomFood", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: ADD_CUSTOM_FOOD_PENDING },
        {
            type: ADD_CUSTOM_FOOD_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.addCustomFood('Papa',200, 100, 1))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should handle requesting editCustomFoodPending API", () => {
        const expectedAction = {
            type: EDIT_CUSTOM_FOOD_PENDING,
        };
        store.dispatch(actions.editCustomFood(1,'pollo',123,123));
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for editCustomFood", () => {
        fetch.mockResponseOnce(JSON.stringify([
            {foodId:1,name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198,},
            {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100}
        ]))

        const expectedActions = [
            { type: EDIT_CUSTOM_FOOD_PENDING },
            { 
                type: EDIT_CUSTOM_FOOD_SUCCESS,
                payload: [
                    {foodId:1,name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198,},
                    {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100} 
                ]
            }
        ];
        ///consultar el edit custom food success
        store.dispatch(actions.editCustomFood(2,'Papas',200, 100))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for editCustomFood", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: EDIT_CUSTOM_FOOD_PENDING },
        {
            type: EDIT_CUSTOM_FOOD_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.editCustomFood(1,'Papa',200, 100))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should handle requesting deleteCustomFoodPending API", () => {
        const expectedAction = {
            type: DELETE_CUSTOM_FOOD_PENDING,
        };
        store.dispatch(actions.deleteCustomFood(1));
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for deleteCustomFood", () => {
        fetch.mockResponseOnce(JSON.stringify([
           
            {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100}
        ]))

        const expectedActions = [
            { type: DELETE_CUSTOM_FOOD_PENDING },
            { 
                type: DELETE_CUSTOM_FOOD_SUCCESS,
                payload: [
                    
                    {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100} 
                ]
            }
        ];

        store.dispatch(actions.deleteCustomFood(2))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for deleteCustomFood", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: DELETE_CUSTOM_FOOD_PENDING },
        {
            type: DELETE_CUSTOM_FOOD_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.deleteCustomFood(1))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });


})