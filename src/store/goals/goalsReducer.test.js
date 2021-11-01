import{
    ADD_OBJECTIVE_TO_CURRENT_GOAL,
   REMOVE_OBJECTIVE_FROM_CURRENT_GOAL,
   CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START ,
   RESET_CURRENT_GOAL ,
   UPDATE_CURRENT_GOAL_IN_STATE ,
   
   ADD_GOAL_PENDING,
   ADD_GOAL_SUCCESS ,
   ADD_GOAL_FAILED ,
   
    GET_GOALS_FROM_USER_PENDING ,
    GET_GOALS_FROM_USER_SUCCESS,
   GET_GOALS_FROM_USER_FAILED,
   
    DELETE_GOAL_PENDING ,
    DELETE_GOAL_SUCCESS ,
    DELETE_GOAL_FAILED ,
   
    UPDATE_CURRENT_GOAL_PENDING ,
    UPDATE_CURRENT_GOAL_SUCCESS,
    UPDATE_CURRENT_GOAL_FAILED 
   } from './goalsConstants';

import * as reducers from './goalsReducer';
let initialStateGoals;
let pendingStateGoals1;
let exampleStateGoals1;
let pendingStateGoals2;

beforeEach(() => {
    initialStateGoals = {
        goals:[],
        currentGoal: {objectives: []},
        isPending:false,
    }
    pendingStateGoals1 = {
        ...initialStateGoals,
        isPending: true
    }
    exampleStateGoals1={
        goals:[  { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
      ],
      currentGoal: {objectives: []},
        isPending:false
    }
    pendingStateGoals2 = {
        goals:[  { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},
        { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},   
      ],
      currentGoal: {objectives: []},
        isPending: true
    }
})

describe('ADD_GOAL', () => {
    it('should handle ADD_GOAL_PENDING action', () => {
        expect(reducers.goalsReducer(initialStateGoals, { type: ADD_GOAL_PENDING })).toEqual(pendingStateGoals1);
    })

    it('should handle ADD_GOAL_SUCCESS action with initial state', () => {
        expect(reducers.goalsReducer(pendingStateGoals1, {
            type: ADD_GOAL_SUCCESS,
            payload: [{ name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
    ]
        })).toEqual(exampleStateGoals1);
    })

    it('should handle ADD_GOAL_FAILED action', () => {
        expect(reducers.goalsReducer(pendingStateGoals1, { type: ADD_GOAL_FAILED, payload: 'Error' })).toEqual({ ...initialStateGoals, error: 'Error' });
    })
})

describe('GET_GOALS_FROM_USER', () => {
    it('should handle GET_GOALS_FROM_USER_PENDING action', () => {
        expect(reducers.goalsReducer(initialStateGoals, { type: GET_GOALS_FROM_USER_PENDING })).toEqual(pendingStateGoals1);
    })

    it('should handle GET_GOALS_FROM_USER_SUCCESS action with initial state', () => {
        expect(reducers.goalsReducer(pendingStateGoals1, {
            type: GET_GOALS_FROM_USER_SUCCESS,
            payload: [{ name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
        ]
        })).toEqual(exampleStateGoals1);
    })

    it('should handle GET_GOALS_FROM_USER_FAILED action with initial state', () => {
        expect(reducers.goalsReducer(pendingStateGoals1, { type: GET_GOALS_FROM_USER_FAILED, payload: 'Error' })).toEqual({ ...initialStateGoals, error: 'Error' });
    })

})
describe('DELETE_GOAL', () => {
    it('should handle DELETE_GOAL_PENDING action', () => {
        expect(reducers.goalsReducer(initialStateGoals, { type: DELETE_GOAL_PENDING })).toEqual(pendingStateGoals1);
    })

    it('should handle DELETE_GOAL_SUCCESS action', () => {
        expect(reducers.goalsReducer(pendingStateGoals2, {
            type: DELETE_GOAL_SUCCESS,
            payload: [ { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
        ]
        })).toEqual(exampleStateGoals1);
    })

    it('should handle DELETE_GOAL_FAILED action', () => {
        expect(reducers.goalsReducer(pendingStateGoals2, { type: DELETE_GOAL_FAILED, payload: 'Error' })).toEqual({ ...pendingStateGoals2, isPending: false, error: 'Error' });
    })
})
describe('UPDATE_CURRENT_GOAL', () => {
    it('should handle UPDATE_CURRENT_GOAL_PENDING action', () => {
        expect(reducers.goalsReducer(initialStateGoals, { type: UPDATE_CURRENT_GOAL_PENDING })).toEqual(pendingStateGoals1);
    })

    it('should handle UPDATE_CURRENT_GOAL_SUCCESS action when initial state', () => {
        expect(reducers.goalsReducer(pendingStateGoals1, {
            type: UPDATE_CURRENT_GOAL_SUCCESS,
            payload: [{ name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []}]
        })).toEqual(exampleStateGoals1);
    })
    it('should handle UPDATE_CURRENT_GOAL_IN_STATE action when initial state', () => {
        expect(reducers.goalsReducer(pendingStateGoals1, {
            type: UPDATE_CURRENT_GOAL_IN_STATE,
            payload: {objectives: [{foodCategoryId:1, objectiveCalories:1000}]}
        })).toEqual({
            goals:  [],
          currentGoal: {objectives: [{foodCategoryId:1, objectiveCalories:1000}]},
            isPending:true
        });
    })

    it('should handle UPDATE_CURRENT_GOAL_FAILED action', () => {
        expect(reducers.goalsReducer(pendingStateGoals1, { type: UPDATE_CURRENT_GOAL_FAILED, payload: 'Error' })).toEqual({ ...pendingStateGoals1, isPending: false, error: 'Error' });
    })
})
describe('RESET_CURRENT_GOAL', () => {
    it('should handle RESET_CURRENT_GOAL action', () => {
        expect(reducers.goalsReducer({ ...initialStateGoals, 
            currentGoal:{ name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []} },
             {
            type: RESET_CURRENT_GOAL,
        })).toEqual(initialStateGoals);
    })
})
describe('CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START', () => {
    it('should handle CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START action', () => {
        expect(reducers.goalsReducer({
            ...initialStateGoals,
            currentGoal:{ name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []}
        }, {
            type: CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START,
            payload: {newName:'SuperPLan ENERO', newTotalCalories: 4000, newDateStart: '2021-09-09T00:00:00.000Z' }
        })).toEqual({ ...initialStateGoals, 
            currentGoal:{ name: 'SuperPLan ENERO',dateStart: '2021-09-09T00:00:00.000Z',totalCalories: 4000,objectives: []} 
        });
    })
})

describe('ADD_OBJECTIVE_TO_CURRENT_GOAL', () => {
    it('should handle ADD_OBJECTIVE_TO_CURRENT_GOAL action', () => {
        expect(reducers.goalsReducer(initialStateGoals, {
            type: ADD_OBJECTIVE_TO_CURRENT_GOAL,
            payload: {
                foodCategoryId:1, 
                objectiveCalories:1000
            }
        })).toEqual({
            ...initialStateGoals,  
            currentGoal: { objectives:[{foodCategoryId:1, objectiveCalories:1000}]}
        });
    })
})
describe('ADD_OBJECTIVE_TO_CURRENT_GOAL adding more objective calories', () => {
    it('should handle ADD_OBJECTIVE_TO_CURRENT_GOAL action', () => {
        expect(reducers.goalsReducer({...initialStateGoals,currentGoal: { objectives:[{foodCategoryId:1, objectiveCalories:1000}]}}, {
            type: ADD_OBJECTIVE_TO_CURRENT_GOAL,
            payload: {
                foodCategoryId:1, 
                objectiveCalories:2000
            }
        })).toEqual({
            ...initialStateGoals,  
            currentGoal: { objectives:[{foodCategoryId:1, objectiveCalories:3000}]}
        });
    })
})
describe('REMOVE_OBJECTIVE_FROM_CURRENT_GOAL', () => {
    it('should handle REMOVE_OBJECTIVE_FROM_CURRENT_GOAL action', () => {
        expect(reducers.goalsReducer({...initialStateGoals,currentGoal: { objectives:[{foodCategoryId:1, objectiveCalories:1000}]}}, {
            type: REMOVE_OBJECTIVE_FROM_CURRENT_GOAL,
            payload: {
                foodCategoryId:1, 
                objectiveCalories:1000
            }
        })).toEqual({
            ...initialStateGoals,  
            isPending: false
        });
    })
})