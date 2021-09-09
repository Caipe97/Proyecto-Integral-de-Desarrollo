import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

import * as actions from "./actions";

import {
    LOGOUT,
  
    LOGIN_OR_REGISTER_PENDING,
    LOGIN_OR_REGISTER_SUCCESS,
    LOGIN_OR_REGISTER_FAILED,
  
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
  
    ADD_RECORD_PENDING,
    ADD_RECORD_SUCCESS,
    ADD_RECORD_FAILED,
  
    GET_RECORDS_FROM_USER_PENDING,
    GET_RECORDS_FROM_USER_SUCCESS,
    GET_RECORDS_FROM_USER_FAILED,
  
    DELETE_RECORD_PENDING,
    DELETE_RECORD_SUCCESS,
    DELETE_RECORD_FAILED
   } from './constants'

const mockStore = configureMockStore([thunkMiddleware]);

describe("logout actions", () => {
    it("should put the state on initial values", () => {
    const expectedAction = {
      type: LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
  });
}),

describe("login or register actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting userData API", () => {
        const expectedAction = {
            type: LOGIN_OR_REGISTER_PENDING,
        };
        store.dispatch(actions.login());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for register", () => {
        fetch.mockResponseOnce(JSON.stringify({
            id: 1,
            name: 'julian',
            surname: 'livrone',
            email: 'julianlivrone@gmail.com',
            password: 'asd',
            gender: 'masculino',
            birthday: '2010-01-21',
            weight: 90,
            height: 170,
        }));
        
        const expectedActions = [
            { type: LOGIN_OR_REGISTER_PENDING },
            { 
                type: LOGIN_OR_REGISTER_SUCCESS,
                payload: {
                    id: 1,
                    name: 'julian',
                    surname: 'livrone',
                    email: 'julianlivrone@gmail.com',
                    password: 'asd',
                    gender: 'masculino',
                    birthday: '2010-01-21',
                    weight: 90,
                    height: 170,
                },
            }
        ];

        store.dispatch(actions.register())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('https://jma-test-app.herokuapp.com/api/users/register');
    });

    it("should create the FAILED action when receiving an error for register", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: LOGIN_OR_REGISTER_PENDING },
        {
            type: LOGIN_OR_REGISTER_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.register())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('https://jma-test-app.herokuapp.com/api/users/register');
    });

    it("should create the SUCCESS action after receiving data for login", () => {
        fetch.mockResponseOnce(JSON.stringify({
            id: 1,
            name: 'julian',
            surname: 'livrone',
            email: 'julianlivrone@gmail.com',
            password: 'asd',
            gender: 'masculino',
            birthday: '2010-01-21',
            weight: 90,
            height: 170,
        }));
        
        const expectedActions = [
            { type: LOGIN_OR_REGISTER_PENDING },
            { 
                type: LOGIN_OR_REGISTER_SUCCESS,
                payload: {
                    id: 1,
                    name: 'julian',
                    surname: 'livrone',
                    email: 'julianlivrone@gmail.com',
                    password: 'asd',
                    gender: 'masculino',
                    birthday: '2010-01-21',
                    weight: 90,
                    height: 170,
                },
            }
        ];

        store.dispatch(actions.login())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('https://jma-test-app.herokuapp.com/api/users/login');
    });

    it("should create the FAILED action when receiving an error for login", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: LOGIN_OR_REGISTER_PENDING },
        {
            type: LOGIN_OR_REGISTER_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.login())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('https://jma-test-app.herokuapp.com/api/users/login');
    });
})

describe("reset password actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting resetPassword API", () => {
        const expectedAction = {
            type: RESET_PASSWORD_PENDING,
        };
        store.dispatch(actions.resetPassword());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for resetPassword", () => {
        fetch.mockResponseOnce(JSON.stringify({id: 1})); //ver que devuelve esta request
        const expectedActions = [
            { type: RESET_PASSWORD_PENDING },
            { 
                type: RESET_PASSWORD_SUCCESS,
                payload: {id: 1},
            }
        ];

        store.dispatch(actions.resetPassword())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
        
    });

    it("should create the FAILED action when receiving an error for resetPassword", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: RESET_PASSWORD_PENDING },
        {
            type: RESET_PASSWORD_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.resetPassword())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})

describe("add record actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting addRecord API", () => {
        const expectedAction = {
            type: ADD_RECORD_PENDING,
        };
        store.dispatch(actions.addRecord());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for addRecord", () => {
        fetch.mockResponseOnce(JSON.stringify({id: 31, foodName: 'milas', gramAmount: 100, userID: 2, dateEaten: '2021-09-09T00:00:00.000Z'}));

        const expectedActions = [
            { type: ADD_RECORD_PENDING },
            { 
                type: ADD_RECORD_SUCCESS,
                payload: {id: 31, foodName: 'milas', gramAmount: 100, userID: 2, dateEaten: '2021-09-09T00:00:00.000Z'},
            }
        ];

        store.dispatch(actions.addRecord())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for addRecord", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: ADD_RECORD_PENDING },
        {
            type: ADD_RECORD_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.addRecord())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})

describe("get records from user actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting getRecordsFromUser API", () => {
        const expectedAction = {
            type: GET_RECORDS_FROM_USER_PENDING,
        };
        store.dispatch(actions.getRecordsFromUser());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for getRecordsFromUser", () => {
        fetch.mockResponseOnce(JSON.stringify([
            {id: 31, foodName: 'milas', gramAmount: 100, userID: 2, dateEaten: '2021-09-09T00:00:00.000Z'}, 
            {id: 12, foodName: 'pure', gramAmount: 70, userID: 2, dateEaten: '2021-09-01T00:00:00.000Z'}
        ]));

        const expectedActions = [
            { type: GET_RECORDS_FROM_USER_PENDING },
            { 
                type: GET_RECORDS_FROM_USER_SUCCESS,
                payload: [
                    {id: 31, foodName: 'milas', gramAmount: 100, userID: 2, dateEaten: '2021-09-09T00:00:00.000Z'}, 
                    {id: 12, foodName: 'pure', gramAmount: 70, userID: 2, dateEaten: '2021-09-01T00:00:00.000Z'}
                ]
            }
        ];

        store.dispatch(actions.getRecordsFromUser())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for getRecordsFromUser", () => {
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: GET_RECORDS_FROM_USER_PENDING },
        {
            type: GET_RECORDS_FROM_USER_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        store.dispatch(actions.getRecordsFromUser())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})

describe("delete record actions", () => {
    const store = mockStore();
    beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
    });

    it("should handle requesting deleteRecord API", () => {
        const expectedAction = {
            type: DELETE_RECORD_PENDING,
        };
        store.dispatch(actions.deleteRecord());
        const action = store.getActions();
        expect(action[0]).toEqual(expectedAction);
    });

    it("should create the SUCCESS action after receiving data for deleteRecord", () => {
        fetch.mockResponseOnce(JSON.stringify({id: 31, foodName: 'milas', gramAmount: 100, userID: 2, dateEaten: '2021-09-09T00:00:00.000Z'}));

        const expectedActions = [
            { type: DELETE_RECORD_PENDING },
            { 
                type: DELETE_RECORD_SUCCESS,
                payload: {id: 31, foodName: 'milas', gramAmount: 100, userID: 2, dateEaten: '2021-09-09T00:00:00.000Z'}
            }
        ];

        store.dispatch(actions.deleteRecord())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it("should create the FAILED action when receiving an error for deleteRecord", () => {
        fetch.mockReject(() => Promise.reject("Cannot delete Record with id=17. Maybe Record was not found!"));
    
        const expectedActions = [
        { type: DELETE_RECORD_PENDING },
        {
            type: DELETE_RECORD_FAILED,
            payload: "Cannot delete Record with id=17. Maybe Record was not found!",
        }
        ];

        store.dispatch(actions.deleteRecord())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
        expect(fetch.mock.calls.length).toEqual(1);
    });
})