import {
    GET_ALL_FOODS_PENDING,
    GET_ALL_FOODS_SUCCESS,
    GET_ALL_FOODS_FAILED
   } from './foodsConstants';

import * as reducers from './foodsReducer';

const initialStateFoods = {
    foods: [],
    isPending: false
}

const pendingStateFoods1 = {
    ...initialStateFoods,
    isPending: true
}

const exampleStateFoods1 = {
    foods: [
        {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198},
        {foodId: 2, name: 'Papa', recommendedServing: 200, caloriesPerServing: 100}
    ],
    isPending: false
}

describe('GET_ALL_FOODS', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoods, {})).toEqual(initialStateFoods);
    })

    it('should handle GET_ALL_FOODS_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoods, {type: GET_ALL_FOODS_PENDING})).toEqual(pendingStateFoods1);
    })

    it('should handle GET_ALL_FOODS_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(pendingStateFoods1, {
            type: GET_ALL_FOODS_SUCCESS, 
            payload: [
                {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198},
                {foodId: 2, name: 'Papa', recommendedServing: 200, caloriesPerServing: 100}
            ]
        })).toEqual(exampleStateFoods1);
    })

    it('should handle GET_ALL_FOODS_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoods1, {type: GET_ALL_FOODS_FAILED, payload: 'Error'})).toEqual({...initialStateFoods, error: 'Error'});
    })
})