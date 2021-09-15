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

import * as reducers from './mealsReducer';

const initialStateMeals = {
    meals: [],
    isPending: false
  }

const pendingStateMeals1 = {
    ...initialStateMeals,
    isPending: true
}

const exampleStateMeals1 = {
    meals: [
        {mealId: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
    ],
    isPending: false
}

const pendingStateMeals2 = {
    meals: [
        {mealId: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
        {mealId: 22, foodName: 'carne', gramAmount: 150, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
    ],
    isPending: true
}

const exampleStateMeals2 = {
    meals: [
        {mealId: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
        {mealId: 22, foodName: 'carne', gramAmount: 150, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
        {mealId: 23, foodName: 'jamon', gramAmount: 200, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
    ],
    isPending: false
}

describe('ADD_MEAL', () => {
    it('should handle ADD_MEAL_PENDING action', () => {
        expect(reducers.mealsReducer(initialStateMeals, {type: ADD_MEAL_PENDING})).toEqual(pendingStateMeals1);
    })

    it('should handle ADD_MEAL_SUCCESS action with initial state meals empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals1, {
            type: ADD_MEAL_SUCCESS, 
            payload: {
                "mealId":21,
                "foodName":"queso",
                "gramAmount":100,
                "dateEaten":"2021-09-09T00:00:00.000Z",
                "userId":1
            }
        })).toEqual(exampleStateMeals1);
    })

    it('should handle ADD_MEAL_SUCCESS action with initial state meals not empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {
            type: ADD_MEAL_SUCCESS, 
            payload: {
                mealId: 23, 
                foodName: 'jamon', 
                gramAmount: 200, 
                dateEaten: '2021-09-09T00:00:00.000Z', 
                userId: 1
            }
        })).toEqual(exampleStateMeals2);
    })

    it('should handle ADD_MEAL_FAILED action', () => {
        expect(reducers.mealsReducer(pendingStateMeals1, {type: ADD_MEAL_FAILED, payload: 'Error'})).toEqual({...initialStateMeals, error: 'Error'});
    })
})

describe('GET_MEALS_FROM_USER', () => {
    it('should handle GET_MEALS_FROM_USER_PENDING action', () => {
        expect(reducers.mealsReducer(initialStateMeals, {type: GET_MEALS_FROM_USER_PENDING})).toEqual(pendingStateMeals1);
    })

    it('should handle GET_MEALS_FROM_USER_SUCCESS action with initial state meals empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals1, {
            type: GET_MEALS_FROM_USER_SUCCESS, 
            payload: [{
                "mealId": 21,
                "foodName": "queso",
                "gramAmount": 100,
                "dateEaten": "2021-09-09T00:00:00.000Z",
                "userId": 1
            }]
        })).toEqual(exampleStateMeals1);
    })

    it('should handle GET_MEALS_FROM_USER_SUCCESS action with initial state meals not empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {
            type: GET_MEALS_FROM_USER_SUCCESS, 
            payload: [
                {mealId: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 22, foodName: 'carne', gramAmount: 150, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 23, foodName: 'jamon', gramAmount: 200, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
            ]
        })).toEqual(exampleStateMeals2);
    })

    it('should handle GET_MEALS_FROM_USER_FAILED action with initial state meals empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals1, {type: GET_MEALS_FROM_USER_FAILED, payload: 'Error'})).toEqual({...initialStateMeals, error: 'Error'});
    })

    it('should handle GET_MEALS_FROM_USER_FAILED action with initial state meals not empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {type: GET_MEALS_FROM_USER_FAILED, payload: 'Error'})).toEqual({...pendingStateMeals2, isPending: false, error: 'Error'});
    })
})

describe('DELETE_MEAL', () => {
    it('should handle DELETE_MEAL_PENDING action', () => {
        expect(reducers.mealsReducer(initialStateMeals, {type: DELETE_MEAL_PENDING})).toEqual(pendingStateMeals1);
    })

    it('should handle DELETE_MEAL_SUCCESS action', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {
            type: DELETE_MEAL_SUCCESS,
            payload: {message: 'Meal was deleted succesfully', deletedMealId: 22}
        })).toEqual(exampleStateMeals1);
    })

    it('should handle DELETE_MEAL_FAILED action', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {type: DELETE_MEAL_FAILED, payload: 'Error'})).toEqual({...pendingStateMeals2, isPending: false, error: 'Error'});
    })
})