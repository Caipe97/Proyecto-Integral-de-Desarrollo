import {
    ADD_MEAL_PENDING,
    ADD_MEAL_SUCCESS,
    ADD_MEAL_FAILED,
  
    GET_MEALS_FROM_USER_PENDING,
    GET_MEALS_FROM_USER_SUCCESS,
    GET_MEALS_FROM_USER_FAILED,
  
    DELETE_MEAL_PENDING,
    DELETE_MEAL_SUCCESS,
    DELETE_MEAL_FAILED,

    ADD_FOOD_TO_CURRENT_MEAL,

    UPDATE_CURRENT_MEAL_IN_STATE,

    REMOVE_FOOD_FROM_CURRENT_MEAL,

    RESET_CURRENT_MEAL,

    CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN,

    UPDATE_CURRENT_MEAL_PENDING,
    UPDATE_CURRENT_MEAL_SUCCESS,
    UPDATE_CURRENT_MEAL_FAILED
   } from './mealsConstants'

import * as reducers from './mealsReducer';

let initialStateMeals;
let pendingStateMeals1;
let exampleStateMeals1;
let pendingStateMeals2;
let exampleStateMeals2;

beforeEach( () => {
    initialStateMeals = {
        meals: [],
        currentMeal: {FoodList: []},
        isPending: false
      }
    
    pendingStateMeals1 = {
        ...initialStateMeals,
        isPending: true
    }
    
    exampleStateMeals1 = {
        meals: [
            {mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
        ],
        currentMeal: {FoodList: []},
        isPending: false
    }
    
    pendingStateMeals2 = {
        meals: [
            {mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
            {mealId: 22, name: 'carne', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
        ],
        currentMeal: {FoodList: []},
        isPending: true
    }
    
    exampleStateMeals2 = {
        meals: [
            {mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
            {mealId: 22, name: 'carne', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
            {mealId: 23, name: 'jamon', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
        ],
        currentMeal: {FoodList: []},
        isPending: false
    }
}
)

describe('ADD_MEAL', () => {
    it('should handle ADD_MEAL_PENDING action', () => {
        expect(reducers.mealsReducer(initialStateMeals, {type: ADD_MEAL_PENDING})).toEqual(pendingStateMeals1);
    })

    it('should handle ADD_MEAL_SUCCESS action with initial state meals empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals1, {
            type: ADD_MEAL_SUCCESS, 
            payload: [{
                mealId: 21,
                name: "queso",
                FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}},
                dateEaten: "2021-09-09T00:00:00.000Z",
                userId: 1
            }]
        })).toEqual(exampleStateMeals1);
    })

    it('should handle ADD_MEAL_SUCCESS action with initial state meals not empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {
            type: ADD_MEAL_SUCCESS, 
            payload: [
                {mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 22, name: 'carne', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 23, name: 'jamon', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
            ]
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
                mealId: 21,
                name: "queso",
                FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}},
                dateEaten: "2021-09-09T00:00:00.000Z",
                userId: 1
            }]
        })).toEqual(exampleStateMeals1);
    })

    it('should handle GET_MEALS_FROM_USER_SUCCESS action with initial state meals not empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {
            type: GET_MEALS_FROM_USER_SUCCESS, 
            payload: [
                {mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 22, name: 'carne', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 23, name: 'jamon', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
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
            payload: [{mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}]
        })).toEqual(exampleStateMeals1);
    })

    it('should handle DELETE_MEAL_FAILED action', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {type: DELETE_MEAL_FAILED, payload: 'Error'})).toEqual({...pendingStateMeals2, isPending: false, error: 'Error'});
    })
})

describe('ADD_FOOD_TO_CURRENT_MEAL', () => {
    it('should handle ADD_FOOD_TO_CURRENT_MEAL action', () => {
        expect(reducers.mealsReducer(initialStateMeals, {
            type: ADD_FOOD_TO_CURRENT_MEAL,
            payload: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}
        })).toEqual({...initialStateMeals, currentMeal: {FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]}});
    })
})

describe('if linea 144 a 146 inside ADD_FOOD_TO_CURRENT_MEAL', () => {
    //initialStateMeals = {
        //meals: [],
       // currentMeal: {FoodList: []},
       // isPending: false
      //}
    it('should handle ADD_FOOD_TO_CURRENT_MEAL action2', () => {
        expect(reducers.mealsReducer({...initialStateMeals, 
            currentMeal: {FoodList:
                 [{quantity: 1, food: {foodId: 1, name: 'Milanesa', 
                 recommendedServing: 85, caloriesPerServing: 198, 
                 createdAt: '2021-09-15T19:58:04.486Z'}}, ]}}, {

        //expect(reducers.mealsReducer(initialStateMeals, {
            type: ADD_FOOD_TO_CURRENT_MEAL,
            payload: {
                foodId: 1, name: 'Milanesa', 
                recommendedServing: 85, caloriesPerServing: 198, 
                createdAt: '2021-09-15T19:58:04.486Z'}
        })).toEqual({...initialStateMeals, 
            currentMeal: {FoodList:
                 [{quantity: 2, food: {foodId: 1, name: 'Milanesa', 
                 recommendedServing: 85, caloriesPerServing: 198, 
                 createdAt: '2021-09-15T19:58:04.486Z'}}, ]}});
    })
})

describe('REMOVE_FOOD_FROM_CURRENT_MEAL', () => {
    it('should handle REMOVE_FOOD_FROM_CURRENT_MEAL action', () => {
        expect(reducers.mealsReducer({...exampleStateMeals1, isPending: true, currentMeal: {FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, {quantity: 1, food: {foodId: 132, name: 'papines', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]}}, {
            type: REMOVE_FOOD_FROM_CURRENT_MEAL,
            payload: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}
        })).toEqual({...exampleStateMeals1, isPending: true, currentMeal: {FoodList: [{quantity: 1, food: {foodId: 132, name: 'papines', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]}});
    })
})

describe('else linea 164 REMOVE_FOOD_FROM_CURRENT_MEAL', () => {
    //exampleStateMeals1 = {
    //    meals: [{mealId: 21, name: 'queso', 
    //FoodList: {quantity: 1, foods: 
    //                        {foodId: 1, name: 'Milanesa', 
    //                         recommendedServing: 85, caloriesPerServing: 198, 
    //                         createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
    //    ],
    //    currentMeal: {FoodList: []},
    //    isPending: false
    //}
    it('should handle REMOVE_FOOD_FROM_CURRENT_MEAL action', () => {
        expect(reducers.mealsReducer({...exampleStateMeals1, 
            isPending: true, 
            currentMeal: {FoodList: 
                            [{quantity: 3, 
                              food: {foodId: 1, name: 'Milanesa', 
                                     recommendedServing: 85, caloriesPerServing: 198, 
                                     createdAt: '2021-09-15T19:58:04.486Z'}}, 
                             {quantity: 1, 
                                food: {foodId: 132, name: 'papines', 
                                recommendedServing: 85, caloriesPerServing: 198, 
                                createdAt: '2021-09-15T19:58:04.486Z'}}]}}, {
            type: REMOVE_FOOD_FROM_CURRENT_MEAL,
            payload: {quantity: 1, 
                      food: {foodId: 1, name: 'Milanesa', 
                             recommendedServing: 85, caloriesPerServing: 198, 
                             createdAt: '2021-09-15T19:58:04.486Z'}}
        })).toEqual({...exampleStateMeals1, 
            isPending: true, 
            currentMeal: {FoodList: 
                [{quantity: 2, 
                  food: {foodId: 1, name: 'Milanesa', 
                         recommendedServing: 85, caloriesPerServing: 198, 
                         createdAt: '2021-09-15T19:58:04.486Z'}}, 
                 {quantity: 1, 
                    food: {foodId: 132, name: 'papines', 
                    recommendedServing: 85, caloriesPerServing: 198, 
                    createdAt: '2021-09-15T19:58:04.486Z'}}]}
                    }
                    );
    })
})


describe('RESET_CURRENT_MEAL', () => {
    it('should handle RESET_CURRENT_MEAL action', () => {
        expect(reducers.mealsReducer({...initialStateMeals, currentMeal: {FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, {quantity: 1, food: {foodId: 132, name: 'papines', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]}}, {
            type: RESET_CURRENT_MEAL,
        })).toEqual(initialStateMeals);
    })
})

describe('CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN', () => {
    it('should handle CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN action', () => {
        expect(reducers.mealsReducer({...initialStateMeals, 
            currentMeal: {FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, {quantity: 1, food: {foodId: 132, name: 'papines', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]}
        }, {
            type: CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN,
            payload: {newName: 'andre', newDateEaten: '2021-09-09T00:00:00.000Z'}
        })).toEqual({...initialStateMeals, currentMeal: {name: 'andre', dateEaten: '2021-09-09T00:00:00.000Z',FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, {quantity: 1, food: {foodId: 132, name: 'papines', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]}});
    })
})

describe('UPDATE_CURRENT_MEAL_IN_STATE', () => {
    it('should handle UPDATE_CURRENT_MEAL_IN_STATE action', () => {
        expect(reducers.mealsReducer(exampleStateMeals2, {
            type: UPDATE_CURRENT_MEAL_IN_STATE,
            payload: {FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}}
        })).toEqual({...exampleStateMeals2, currentMeal: {FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}}});
    })
})

describe('UPDATE_CURRENT_MEAL', () => {
    it('should handle UPDATE_CURRENT_MEAL_PENDING action', () => {
        expect(reducers.mealsReducer(initialStateMeals, {type: UPDATE_CURRENT_MEAL_PENDING})).toEqual(pendingStateMeals1);
    })

    it('should handle UPDATE_CURRENT_MEAL_SUCCESS action when initial state is empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals1, {
            type: UPDATE_CURRENT_MEAL_SUCCESS,
            payload: [{mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}]
        })).toEqual(exampleStateMeals1);
    })

    it('should handle UPDATE_CURRENT_MEAL_SUCCESS action when initial state is not empty', () => {
        expect(reducers.mealsReducer(pendingStateMeals2, {
            type: UPDATE_CURRENT_MEAL_SUCCESS,
            payload: [
                {mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 22, name: 'carne', FoodList: {quantity: 2, foods: {foodId: 2, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
            ]
        })).toEqual({...pendingStateMeals2, isPending: false, meals: [
            {mealId: 21, name: 'queso', FoodList: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
            {mealId: 22, name: 'carne', FoodList: {quantity: 2, foods: {foodId: 2, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
        ]});
    })

    it('should handle UPDATE_CURRENT_MEAL_FAILED action', () => {
        expect(reducers.mealsReducer(pendingStateMeals1, {type: UPDATE_CURRENT_MEAL_FAILED, payload: 'Error'})).toEqual({...pendingStateMeals1, isPending: false, error: 'Error'});
    })
})