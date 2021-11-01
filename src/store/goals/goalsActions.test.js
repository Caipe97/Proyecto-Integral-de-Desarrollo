import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

import * as actions from "./goalsActions";

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


const mockStore = configureMockStore([thunkMiddleware]);

describe("add goal actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting addGoal API", () => {
        const expectedAction = {
            type: ADD_GOAL_PENDING,
        };
        store.dispatch(actions.addGoal(1,{
            name: 'Plan marzo',
            dateStart: "2021-09-03T00:00:00.000Z",
            totalCalories: 700,
            objectives: []
        }));
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });
    it("should create the SUCCESS action after receiving data for addGoal", () => {
        fetch.mockResponseOnce(JSON.stringify([
            { name: 'Plan marzo',
            dateStart: "2021-09-03T00:00:00.000Z",
            totalCalories: 1300,
            objectives: []},
            { name: 'Plan enero',
            dateStart: "2021-09-01T00:00:00.000Z",
            totalCalories: 7000,
            objectives: []},
        ]));

        const expectedActions = [
            { type: ADD_GOAL_PENDING },
            { 
                type: ADD_GOAL_SUCCESS,
                payload: [
                    { name: 'Plan marzo',
            dateStart: "2021-09-03T00:00:00.000Z",
            totalCalories: 1300,
            objectives: []},
            { name: 'Plan enero',
            dateStart: "2021-09-01T00:00:00.000Z",
            totalCalories: 7000,
            objectives: []},
                ],
            }
        ];

        store.dispatch(actions.addGoal(1, { name: 'Plan enero',        dateStart: "2021-09-01T00:00:00.000Z",        totalCalories: 7000,        objectives: []}))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
    it("should create the FAILED action when receiving an error for addGoal", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data"));
    
        const expectedActions = [
        { type: ADD_GOAL_PENDING },
        {
            type: ADD_GOAL_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.addGoal(1, { name: 'Plan enero',        dateStart: "2021-09-01T00:00:00.000Z",        totalCalories: 7000,        objectives: []}))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

})

describe("get goals from user actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting getGoalsFromUser API", () => {
        const expectedAction = {
            type: GET_GOALS_FROM_USER_PENDING,
        };
        store.dispatch(actions.getGoalsFromUser());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });
    it("should create the SUCCESS action after receiving data for getGoalsFromUser", () => {
        fetch.mockResponseOnce(JSON.stringify([
            { name: 'Plan marzo',dateStart: "2021-09-03T00:00:00.000Z",totalCalories: 1300,objectives: []},
             { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
             { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},      
        ]));

        const expectedActions = [
            { type: GET_GOALS_FROM_USER_PENDING },
            { 
                type: GET_GOALS_FROM_USER_SUCCESS,
                payload: [
                    { name: 'Plan marzo',dateStart: "2021-09-03T00:00:00.000Z",totalCalories: 1300,objectives: []},
                    { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},       
                    { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},      
                ]
            }
        ];

        store.dispatch(actions.getGoalsFromUser())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
    it("should create the FAILED action when receiving an error for getGoalsFromUser", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data"));
    
        const expectedActions = [
        { type: GET_GOALS_FROM_USER_PENDING },
        {
            type: GET_GOALS_FROM_USER_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.getGoalsFromUser())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})
describe("delete goal actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting deleteGoal API", () => {
        const expectedAction = {
            type: DELETE_GOAL_PENDING,
        };
        store.dispatch(actions.deleteGoal());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });
    it("should create the SUCCESS action after receiving data for deleteGoal", () => {
        fetch.mockResponseOnce(JSON.stringify([
            { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
            { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},      
        ]));

        const expectedActions = [
            { type: DELETE_GOAL_PENDING },
            { 
                type: DELETE_GOAL_SUCCESS,
                payload: [
                    { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
                    { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},        
                ]
            }
        ];

        store.dispatch(actions.deleteGoal())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
    it("should create the FAILED action when receiving an error for deleteGoal", () => {
        fetch.mockReject(() => Promise.reject("Cannot delete Goal. Maybe Goal was not found!"));
    
        const expectedActions = [
        { type: DELETE_GOAL_PENDING },
        {
            type: DELETE_GOAL_FAILED,
            payload: "Cannot delete Goal. Maybe Goal was not found!",
        }
        ];
        store.dispatch(actions.deleteGoal())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

})
describe("update current goal actions", () => {
    const exampleOfGoal = {name: 'Plan marzo',dateStart: "2021-09-03T00:00:00.000Z",totalCalories: 1300,objectives: []}
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });
    it("should handle requesting updateCurrentGoal API", () => {
        const expectedAction = {
            type: UPDATE_CURRENT_GOAL_PENDING,
        };
        store.dispatch(actions.updateCurrentGoal(1,exampleOfGoal));
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });
    it("should create the SUCCESS action after receiving data for updateCurrentGoal", () => {
        fetch.mockResponseOnce(JSON.stringify([
            { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
            { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},      
            {name: 'Plan marzo',dateStart: "2021-09-03T00:00:00.000Z",totalCalories: 1300,objectives: []}
        ]));

        const expectedActions = [
            { type: UPDATE_CURRENT_GOAL_PENDING },
            { 
                type: UPDATE_CURRENT_GOAL_SUCCESS,
                payload: [
                    { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},    
                    { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},
                    {name: 'Plan marzo',dateStart: "2021-09-03T00:00:00.000Z",totalCalories: 1300,objectives: []}  
                ]
            }
        ];

        store.dispatch(actions.updateCurrentGoal(1,exampleOfGoal))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
    it("should create the FAILED action when receiving an error for updateCurrentGoal", () => {
        fetch.mockReject(() => Promise.reject("Cannot update current Goal. Maybe Goal was not found!"));
    
        const expectedActions = [
        { type: UPDATE_CURRENT_GOAL_PENDING },
        {
            type: UPDATE_CURRENT_GOAL_FAILED,
            payload: "Cannot update current Goal. Maybe Goal was not found!",
        }
        ];

        store.dispatch(actions.updateCurrentGoal(1,exampleOfGoal))
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})
describe("objectives on current goal actions", () => {
    const store = mockStore();
    beforeEach(() => {
        store.clearActions();
    });

    it("should handle addObjectiveToCurrentMeal", () => {
        const expectedAction = {
          type: ADD_OBJECTIVE_TO_CURRENT_GOAL
        };
        expect(actions.addObjectiveToCurrentGoal()).toEqual(expectedAction);
      });

      it("should handle removeObjectiveFromCurrentMeal", () => {
        const expectedAction = {
          type: REMOVE_OBJECTIVE_FROM_CURRENT_GOAL
        };
        expect(actions.removeObjectiveFromCurrentGoal()).toEqual(expectedAction);
      });

      it("should handle resetCurrentGoal", () => {
        const expectedAction = {
          type: RESET_CURRENT_GOAL
        };
        expect(actions.resetCurrentGoal()).toEqual(expectedAction);
      });
})
describe("UPDATE_CURRENT_GOAL_IN_STATE action", () => {
    const store = mockStore();
    beforeEach(() => {
        store.clearActions();
    });

    it("should handle updateCurrentGoalInState", () => {
        const expectedAction = {
          type: UPDATE_CURRENT_GOAL_IN_STATE
        };
        expect(actions.updateCurrentGoalInState()).toEqual(expectedAction);
      });
})

describe("CHANGE_CURRENT_GOAL_NAME_AND_DATE_EATEN action", () => {
    const store = mockStore();
    beforeEach(() => {
        store.clearActions();
    });

    it("should handle updateCurrentGoalInState", () => {
        const expectedAction = {
          type: CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START,
          payload: {newDateStart: undefined, newName: undefined,newTotalCalories:undefined}
        };
        expect(actions.changeCurrentGoalNameTotalCaloriesAndDateStart()).toEqual(expectedAction);
      });
})