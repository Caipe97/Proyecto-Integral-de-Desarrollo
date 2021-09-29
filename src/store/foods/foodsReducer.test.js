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

const exampleStateFoods2 = {
    foods: [
        {name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, userId:1},
                    {name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, userId:1}
    ],
    isPending: false
}
const exampleStateFoods3 = {
    foods: [
        {foodId:1,name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198,},
        {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100}
    ],
    isPending: false
}
const exampleStateFoods3ini = {
    foods:[{foodId:1,name: 'Milanes', recommendedServing: 85, caloriesPerServing: 198,},
            {foodId:2,name: 'Papa', recommendedServing: 200, caloriesPerServing: 100}
        
        ],
            isPending: false
}
const exampleStateFoods4 = {
        foods: [
            {foodId:1,name: 'Milanes', recommendedServing: 85, caloriesPerServing: 198,},
        ],
        isPending: false
    }
    const exampleStateFoods4sin = {
        foods: [
           
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

describe('ADD_CUSTOM', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoods, {})).toEqual(initialStateFoods);
    })

    it('should handle ADD_CUSTOM_FOOD_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoods, {type: ADD_CUSTOM_FOOD_PENDING})).toEqual(pendingStateFoods1);
    })

    it('should handle ADD_CUSTOM_FOOD_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(pendingStateFoods1, {
            type: ADD_CUSTOM_FOOD_SUCCESS, 
            payload: [
                
                {name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, userId:1},
                    {name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, userId:1}
            ]
        })).toEqual(exampleStateFoods2);
    })

    it('should handle ADD_CUSTOM_FOOD_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoods1, {type: ADD_CUSTOM_FOOD_FAILED, payload: 'Error'})).toEqual({...initialStateFoods, error: 'Error'});
    })
})

describe('EDIT_CUSTOM', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoods, {})).toEqual(initialStateFoods);
    })

    it('should handle EDIT_CUSTOM_FOOD_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoods, {type: EDIT_CUSTOM_FOOD_PENDING})).toEqual(pendingStateFoods1);
    })
    // const exampleStateFoods3 = {
    //     foods: [
    //         {foodId:1,name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198,},
    //         {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100}
    //     ],
    //     isPending: false
    // }
    
    it('should handle EDIT_CUSTOM_FOOD_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(   exampleStateFoods3ini
        , {
            type: EDIT_CUSTOM_FOOD_SUCCESS, 
            payload: [
                {foodId:1,name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198,},
                {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100} 
            ]
        })).toEqual(exampleStateFoods3);
        //exampleStateFoods3
    })

    it('should handle ADD_CUSTOM_FOOD_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoods1, {type: EDIT_CUSTOM_FOOD_FAILED, payload: 'Error'})).toEqual({...initialStateFoods, error: 'Error'});
    })
})

describe('DELETE_CUSTOM', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoods, {})).toEqual(initialStateFoods);
    })

    it('should handle DELETE_CUSTOM_FOOD_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoods, {type: DELETE_CUSTOM_FOOD_PENDING})).toEqual(pendingStateFoods1);
    })
   
    
    it('should handle DELETE_CUSTOM_FOOD_SUCCESS action with initial state meals empty', () => {
        // const exampleStateFoods4 = {
        //     foods: [
        //         {foodId:1,name: 'Milanes', recommendedServing: 85, caloriesPerServing: 198,},
        //     ],
        //     isPending: false
        // }
        // const exampleStateFoods4sin = {
        //     foods: [
               
        //     ],
        //     isPending: false
        // }
        expect(reducers.foodsReducer(   exampleStateFoods4
        , {
            type: DELETE_CUSTOM_FOOD_SUCCESS, 
            payload: 
               
                    {foodId:1,name: 'Milanes', recommendedServing: 85, caloriesPerServing: 198,
                
            }
        })).toEqual(exampleStateFoods4);
    })

    it('should handle DELETE_CUSTOM_FOOD_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoods1, {type: DELETE_CUSTOM_FOOD_FAILED, payload: 'Error'})).toEqual({...initialStateFoods, error: 'Error'});
    })
})