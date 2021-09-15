import {
    LOGOUT,
  
    LOGIN_OR_REGISTER_PENDING,
    LOGIN_OR_REGISTER_SUCCESS,
    LOGIN_OR_REGISTER_FAILED,
  
    RESET_PASSWORD_PENDING,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
   } from './userDataConstants'

import * as reducers from './userDataReducer';

const initialStateUserData = {
    userId: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    weight: '',
    height: '',
    isPending: false
}

const pendingStateUserData = {
    ...initialStateUserData,
    isPending: true
}

const exampleStateUserData = {
    userId: 1,
    name: 'julian',
    surname: 'livrone',
    email: 'julianlivrone@gmail.com',
    password: 'asd',
    gender: 'masculino',
    birthday: '2021-09-01',
    weight: 90,
    height: 170,
    isPending: false
}

describe('LOGOUT and default', () => {
    it('should return the initial state', () => {
        expect(reducers.userDataReducer(undefined, {})).toEqual(initialStateUserData);
    })

    it('should handle LOGOUT action', () => {
        expect(reducers.userDataReducer(exampleStateUserData, {type: LOGOUT})).toEqual(initialStateUserData);
    })
})

describe('LOGIN_OR_REGISTER', () => {
    it('should handle LOGIN_OR_REGISTER_PENDING action', () => {
        expect(reducers.userDataReducer(initialStateUserData, {type: LOGIN_OR_REGISTER_PENDING})).toEqual(pendingStateUserData);
    })

    it('should handle LOGIN_OR_REGISTER_SUCCESS action', () => {
        expect(reducers.userDataReducer(pendingStateUserData, {type: LOGIN_OR_REGISTER_SUCCESS, payload: exampleStateUserData})).toEqual(exampleStateUserData);
    })

    it('should handle LOGIN_OR_REGISTER_FAILED action', () => {
        expect(reducers.userDataReducer(pendingStateUserData, {type: LOGIN_OR_REGISTER_FAILED, payload: 'Error'})).toEqual({...initialStateUserData, error: 'Error'});
    })
})

describe('RESET_PASSWORD', () => {
    it('should handle RESET_PASSWORD_PENDING action', () => {
        expect(reducers.userDataReducer(initialStateUserData, {type: RESET_PASSWORD_PENDING})).toEqual(pendingStateUserData);
    })

    it('should handle RESET_PASSWORD_SUCCESS action', () => {
        expect(reducers.userDataReducer(pendingStateUserData, {type: RESET_PASSWORD_SUCCESS})).toEqual(initialStateUserData);
    })

    it('should handle RESET_PASSWORD_FAILED action', () => {
        expect(reducers.userDataReducer(pendingStateUserData, {type: RESET_PASSWORD_FAILED, payload: 'Error'})).toEqual({...initialStateUserData, error: 'Error'});
    })
})