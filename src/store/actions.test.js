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

    it("should create the SUCCESS action after receiving data", () => {
        // fetchMock.getOnce("https://jsonplaceholder.typicode.com/users", {
        //   body: { id: 3, name: "John Whatever", email: "johnwhatever@gmail.com" },
        //   headers: { "content-type": "application/json" },
        // });
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

        //assert on the response
        store.dispatch(actions.login())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });

        //assert on the times called
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('https://jma-test-app.herokuapp.com/api/users/login');
    });

    it("should create the FAILED action when receiving an error", () => {
        // fetchMock.getOnce("https://jsonplaceholder.typicode.com/users", {
        //   throws: "ERROR: could not fetch data",
        //   headers: { "content-type": "application/json" },
        // });
        fetch.mockReject(() => Promise.reject("ERROR: could not fetch data")); //preguntar este mensaje de error a manu
    
        const expectedActions = [
        { type: LOGIN_OR_REGISTER_PENDING },
        {
            type: LOGIN_OR_REGISTER_FAILED,
            payload: "ERROR: could not fetch data",
        }
        ];

        //assert on the response
        store.dispatch(actions.login())
        .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });

        //assert on the times called
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('https://jma-test-app.herokuapp.com/api/users/login');
    });

})
 



// describe("async actions", () => {
//   const store = mockStore();

//   beforeEach(() => {
//     fetch.resetMocks();
//     store.clearActions();
//   });

//   it("should create the SUCCESS action after receiving data", () => {
//     // fetchMock.getOnce("https://jsonplaceholder.typicode.com/users", {
//     //   body: { id: 3, name: "John Whatever", email: "johnwhatever@gmail.com" },
//     //   headers: { "content-type": "application/json" },
//     // });
//     fetch.mockResponseOnce(JSON.stringify({
//       id: 3, name: "John Whatever", email: "johnwhatever@gmail.com" 
//     }));
    
//     const expectedActions = [
//       { type: REQUEST_ROBOTS_PENDING },
//       {
//         type: REQUEST_ROBOTS_SUCCESS,
//         payload: {
//           id: 3,
//           name: "John Whatever",
//           email: "johnwhatever@gmail.com",
//         },
//       }
//     ];

//     //assert on the response
//     store.dispatch(actions.requestRobots())
//       .then(() => {
//         const actions = store.getActions();
//         expect(actions).toEqual(expectedActions);
//       });

//     //assert on the times called
//     expect(fetch.mock.calls.length).toEqual(1);
//     console.log(fetch.mock)
//   });
 
//   it("should create the FAILED action when receiving an error", () => {
//     // fetchMock.getOnce("https://jsonplaceholder.typicode.com/users", {
//     //   throws: "ERROR: could not fetch data",
//     //   headers: { "content-type": "application/json" },
//     // });
//     fetch.mockReject(() => Promise.reject("ERROR: could not fetch data"));
 
//     const expectedActions = [
//       { type: REQUEST_ROBOTS_PENDING },
//       {
//         type: REQUEST_ROBOTS_FAILED,
//         payload: "ERROR: could not fetch data",
//       }
//     ];

//     //assert on the response
//     store.dispatch(actions.requestRobots())
//       .then(() => {
//         const actions = store.getActions();
//         expect(actions).toEqual(expectedActions);
//       });

//     //assert on the times called
//     expect(fetch.mock.calls.length).toEqual(1);
//   });
// });