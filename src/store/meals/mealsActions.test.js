import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

import * as actions from "./mealsActions";

import {
    ADD_MEAL_PENDING,
    ADD_MEAL_SUCCESS,
    ADD_MEAL_FAILED,
  
    GET_MEALS_FROM_USER_PENDING,
    GET_MEALS_FROM_USER_SUCCESS,
    GET_MEALS_FROM_USER_FAILED,
  
    DELETE_MEAL_PENDING,
    DELETE_MEAL_SUCCESS,
    DELETE_MEAL_FAILED
   } from './mealsConstants'

const mockStore = configureMockStore([thunkMiddleware]);

describe("add meal actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting addMeal API", () => {
        const expectedAction = {
            type: ADD_MEAL_PENDING,
        };
        store.dispatch(actions.addMeal());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for addMeal", () => {
        fetch.mockResponseOnce(JSON.stringify({mealId: 31, foodName: 'milas', gramAmount: 100, userId: 2, dateEaten: '2021-09-09T00:00:00.000Z'}));

        const expectedActions = [
            { type: ADD_MEAL_PENDING },
            { 
                type: ADD_MEAL_SUCCESS,
                payload: {mealId: 31, foodName: 'milas', gramAmount: 100, userId: 2, dateEaten: '2021-09-09T00:00:00.000Z'},
            }
        ];

        store.dispatch(actions.addMeal())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for addMeal", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: ADD_MEAL_PENDING },
        {
            type: ADD_MEAL_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.addMeal())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})

describe("get meals from user actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting getMealsFromUser API", () => {
        const expectedAction = {
            type: GET_MEALS_FROM_USER_PENDING,
        };
        store.dispatch(actions.getMealsFromUser());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for getMealsFromUser", () => {
        fetch.mockResponseOnce(JSON.stringify([
            {mealId: 31, foodName: 'milas', gramAmount: 100, userId: 2, dateEaten: '2021-09-09T00:00:00.000Z'}, 
            {mealId: 12, foodName: 'pure', gramAmount: 70, userId: 2, dateEaten: '2021-09-01T00:00:00.000Z'}
        ]));

        const expectedActions = [
            { type: GET_MEALS_FROM_USER_PENDING },
            { 
                type: GET_MEALS_FROM_USER_SUCCESS,
                payload: [
                    {mealId: 31, foodName: 'milas', gramAmount: 100, userId: 2, dateEaten: '2021-09-09T00:00:00.000Z'}, 
                    {mealId: 12, foodName: 'pure', gramAmount: 70, userId: 2, dateEaten: '2021-09-01T00:00:00.000Z'}
                ]
            }
        ];

        store.dispatch(actions.getMealsFromUser())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for getMealsFromUser", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: GET_MEALS_FROM_USER_PENDING },
        {
            type: GET_MEALS_FROM_USER_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.getMealsFromUser())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})

describe("delete meal actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting deleteMeal API", () => {
        const expectedAction = {
            type: DELETE_MEAL_PENDING,
        };
        store.dispatch(actions.deleteMeal());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for deleteMeal", () => {
        fetch.mockResponseOnce(JSON.stringify({mealId: 31, foodName: 'milas', gramAmount: 100, userId: 2, dateEaten: '2021-09-09T00:00:00.000Z'}));

        const expectedActions = [
            { type: DELETE_MEAL_PENDING },
            { 
                type: DELETE_MEAL_SUCCESS,
                payload: {mealId: 31, foodName: 'milas', gramAmount: 100, userId: 2, dateEaten: '2021-09-09T00:00:00.000Z'}
            }
        ];

        store.dispatch(actions.deleteMeal())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for deleteMeal", () => {
        fetch.mockReject(() => Promise.reject("Cannot delete Meal with mealId=17. Maybe Meal was not found!"));
    
        const expectedActions = [
        { type: DELETE_MEAL_PENDING },
        {
            type: DELETE_MEAL_FAILED,
            payload: "Cannot delete Meal with mealId=17. Maybe Meal was not found!",
        }
        ];

        store.dispatch(actions.deleteMeal())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})