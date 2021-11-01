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

  GET_FOOD_CATEGORIES_PENDING,
  GET_FOOD_CATEGORIES_SUCCESS,
  GET_FOOD_CATEGORIES_FAILED,

  CREATE_FOOD_CATEGORY_PENDING,
  CREATE_FOOD_CATEGORY_SUCCESS,
  CREATE_FOOD_CATEGORY_FAILED,

  EDIT_FOOD_CATEGORY_PENDING,
  EDIT_FOOD_CATEGORY_SUCCESS,
  EDIT_FOOD_CATEGORY_FAILED,

  DELETE_FOOD_CATEGORY_PENDING,
  DELETE_FOOD_CATEGORY_SUCCESS,
  DELETE_FOOD_CATEGORY_FAILED
   } from './foodsConstants';

import * as reducers from './foodsReducer';

const initialStateFoods = {
    foods: [],
    isPending: false
}
const initialStateFoodCategories={
    foodCategories:[],
    isPending:false
}
const pendingStateFoodCategories={
    ...initialStateFoodCategories,
    isPending:true
}
const exampleStateFoodCategories={
    foodCategories:[
        {
          foodCategoryId: 1,
          name: "Fruta",
          createdAt: "2021-09-30T14:09:34.756Z",
          updatedAt: "2021-09-30T14:09:34.756Z",
          userId: null
        },
        {
          foodCategoryId: 7,
          name: "Fideos",
          createdAt: "2021-09-30T18:58:58.542Z",
          updatedAt: "2021-09-30T18:58:58.542Z",
          userId: null
        }
      ],
    isPending:true
}
const exampleStateFoodCategories2={
    foodCategories:[
        {
          foodCategoryId: 1,
          name: "Fruta",
          createdAt: "2021-09-30T14:09:34.756Z",
          updatedAt: "2021-09-30T14:09:34.756Z",
          userId: null
        }
      ],
    isPending:true
}
const exampleStateFoodCategories2R={
    foodCategories:[
        {
          foodCategoryId: 1,
          name: "Frutas",
          createdAt: "2021-09-30T14:09:34.756Z",
          updatedAt: "2021-09-30T14:09:34.756Z",
          userId: null
        }
      ],
    isPending:false
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
    
    it('should handle EDIT_CUSTOM_FOOD_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(   exampleStateFoods3ini
        , {
            type: EDIT_CUSTOM_FOOD_SUCCESS, 
            payload: [
                {foodId:1,name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198,},
                {foodId:2,name: 'Papas', recommendedServing: 200, caloriesPerServing: 100} 
            ]
        })).toEqual(exampleStateFoods3);
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
  
        expect(reducers.foodsReducer(exampleStateFoods4, {
            type: DELETE_CUSTOM_FOOD_SUCCESS, 
            payload: [{foodId:1, name: 'Milanes', recommendedServing: 85, caloriesPerServing: 198}]
        }
        )).toEqual(exampleStateFoods4);
    })

    it('should handle DELETE_CUSTOM_FOOD_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoods1, {type: DELETE_CUSTOM_FOOD_FAILED, payload: 'Error'})).toEqual({...initialStateFoods, error: 'Error'});
    })
})

describe('GET_FOOD_CATEGORIES', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {})).toEqual(initialStateFoodCategories);
    })

    it('should handle GET_FOOD_CATEGORIES_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {type: GET_FOOD_CATEGORIES_PENDING})).toEqual(pendingStateFoodCategories);
    })

    it('should handle GET_FOOD_CATEGORIES_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {
            type: GET_FOOD_CATEGORIES_SUCCESS, 
            payload:[
                {
                  foodCategoryId: 1,
                  name: "Fruta",
                  createdAt: "2021-09-30T14:09:34.756Z",
                  updatedAt: "2021-09-30T14:09:34.756Z",
                  userId: null
                },
                {
                  foodCategoryId: 7,
                  name: "Fideos",
                  createdAt: "2021-09-30T18:58:58.542Z",
                  updatedAt: "2021-09-30T18:58:58.542Z",
                  userId: null
                },
              ],
        })).toEqual({...exampleStateFoodCategories,isPending:false});
    })

    it('should handle GET_FOOD_CATEGORIES_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoodCategories, {type: GET_FOOD_CATEGORIES_FAILED, payload: 'Error'})).toEqual({...initialStateFoodCategories, error: 'Error'});
    })
})

describe('CREATE_FOOD_CATEGORY', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {})).toEqual(initialStateFoodCategories);
    })

    it('should handle CREATE_FOOD_CATEGORY_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {type: CREATE_FOOD_CATEGORY_PENDING})).toEqual(pendingStateFoodCategories);
    })

    it('should handle CREATE_FOOD_CATEGORY_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(pendingStateFoodCategories, {
            type: CREATE_FOOD_CATEGORY_SUCCESS, 
            payload:[
                {
                  foodCategoryId: 1,
                  name: "Fruta",
                  createdAt: "2021-09-30T14:09:34.756Z",
                  updatedAt: "2021-09-30T14:09:34.756Z",
                  userId: null
                },
                {
                  foodCategoryId: 7,
                  name: "Fideos",
                  createdAt: "2021-09-30T18:58:58.542Z",
                  updatedAt: "2021-09-30T18:58:58.542Z",
                  userId: null
                }
              ],
        })).toEqual({...exampleStateFoodCategories,isPending:false});
    })

    it('should handle CREATE_FOOD_CATEGORY_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoodCategories, {type: CREATE_FOOD_CATEGORY_FAILED, payload: 'Error'})).toEqual({...initialStateFoodCategories, error: 'Error'});
    })
})

/////////////////////////////////////////////////////////////////////////
describe('EDIT_FOOD_CATEGORY', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {})).toEqual(initialStateFoodCategories);
    })

    it('should handle EDIT_FOOD_CATEGORY_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {type: EDIT_FOOD_CATEGORY_PENDING})).toEqual(pendingStateFoodCategories);
    })

    it('should handle EDIT_FOOD_CATEGORY_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(exampleStateFoodCategories2, {
            type: EDIT_FOOD_CATEGORY_SUCCESS, 
            payload:[
                {
                  foodCategoryId: 1,
                  name: "Frutas",
                  createdAt: "2021-09-30T14:09:34.756Z",
                  updatedAt: "2021-09-30T14:09:34.756Z",
                  userId: null
                }
              ],
        })).toEqual(exampleStateFoodCategories2R);
    })

    it('should handle EDIT_FOOD_CATEGORY_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoodCategories, {type: EDIT_FOOD_CATEGORY_FAILED, payload: 'Error'})).toEqual({...initialStateFoodCategories, error: 'Error'});
    })
})

describe('DELETE_FOOD_CATEGORY', () => {
    it('should return the same state', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {})).toEqual(initialStateFoodCategories);
    })

    it('should handle DELETE_FOOD_CATEGORY_PENDING action', () => {
        expect(reducers.foodsReducer(initialStateFoodCategories, {type: DELETE_FOOD_CATEGORY_PENDING})).toEqual(pendingStateFoodCategories);
    })

    it('should handle DELETE_FOOD_CATEGORY_SUCCESS action with initial state meals empty', () => {
        expect(reducers.foodsReducer(exampleStateFoodCategories2, {
            type: DELETE_FOOD_CATEGORY_SUCCESS, 
            payload:[
              ]
        })).toEqual(initialStateFoodCategories);
    })

    it('should handle EDIT_FOOD_CATEGORY_FAILED action', () => {
        expect(reducers.foodsReducer(pendingStateFoodCategories, {type: DELETE_FOOD_CATEGORY_FAILED, payload: 'Error'})).toEqual({...initialStateFoodCategories, error: 'Error'});
    })
})