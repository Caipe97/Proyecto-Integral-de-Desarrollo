import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

import * as actions from "./userDataActions";

import {
    LOGOUT,
  
    LOGIN_OR_REGISTER_PENDING,
    LOGIN_OR_REGISTER_SUCCESS,
    LOGIN_OR_REGISTER_FAILED,
  
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
   } from './userDataConstants'

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
            userId: 1,
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
                    userId: 1,
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
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data"));
    
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
            userId: 1,
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
                    userId: 1,
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
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data"));
    
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
        fetch.mockResponseOnce(JSON.stringify({userId: 1}));
        const expectedActions = [
            { type: RESET_PASSWORD_PENDING },
            { 
                type: RESET_PASSWORD_SUCCESS,
                payload: {userId: 1},
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
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data"));
    
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