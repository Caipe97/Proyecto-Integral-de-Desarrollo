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

import * as reducers from './reducers';

const initialStateUserData = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    weight: 0,
    height: 0,
    isPending: false
}

const pendingStateUserData = {
    ...initialStateUserData,
    isPending: true
}

const exampleStateUserData = {
    id: 1,
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

const initialStateRecords = {
    records: [],
    isPending: false
  }

const pendingStateRecords1 = {
    ...initialStateRecords,
    isPending: true
}

const exampleStateRecords1 = {
    records: [
        {id: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1}
    ],
    isPending: false
}

const pendingStateRecords2 = {
    records: [
        {id: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1},
        {id: 22, foodName: 'carne', gramAmount: 150, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1},
    ],
    isPending: true
}

const exampleStateRecords2 = {
    records: [
        {id: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1},
        {id: 22, foodName: 'carne', gramAmount: 150, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1},
        {id: 23, foodName: 'jamon', gramAmount: 200, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1}
    ],
    isPending: false
}

describe('ADD_RECORD', () => {
    it('should handle ADD_RECORD_PENDING action', () => {
        expect(reducers.recordsReducer(initialStateRecords, {type: ADD_RECORD_PENDING})).toEqual(pendingStateRecords1);
    })

    it('should handle ADD_RECORD_SUCCESS action with initial state records empty', () => {
        expect(reducers.recordsReducer(pendingStateRecords1, {
            type: ADD_RECORD_SUCCESS, 
            payload: {
                "id":21,
                "foodName":"queso",
                "gramAmount":100,
                "dateEaten":"2021-09-09T00:00:00.000Z",
                "userID":1
            }
        })).toEqual(exampleStateRecords1);
    })

    it('should handle ADD_RECORD_SUCCESS action with initial state records not empty', () => {
        expect(reducers.recordsReducer(pendingStateRecords2, {
            type: ADD_RECORD_SUCCESS, 
            payload: {
                id: 23, 
                foodName: 'jamon', 
                gramAmount: 200, 
                dateEaten: '2021-09-09T00:00:00.000Z', 
                userID: 1
            }
        })).toEqual(exampleStateRecords2);
    })

    it('should handle ADD_RECORD_FAILED action', () => {
        expect(reducers.recordsReducer(pendingStateRecords1, {type: ADD_RECORD_FAILED, payload: 'Error'})).toEqual({...initialStateRecords, error: 'Error'});
    })
})

describe('GET_RECORDS_FROM_USER', () => {
    it('should handle GET_RECORDS_FROM_USER_PENDING action', () => {
        expect(reducers.recordsReducer(initialStateRecords, {type: GET_RECORDS_FROM_USER_PENDING})).toEqual(pendingStateRecords1);
    })

    it('should handle GET_RECORDS_FROM_USER_SUCCESS action with initial state records empty', () => {
        expect(reducers.recordsReducer(pendingStateRecords1, {
            type: GET_RECORDS_FROM_USER_SUCCESS, 
            payload: [{
                "id": 21,
                "foodName": "queso",
                "gramAmount": 100,
                "dateEaten": "2021-09-09T00:00:00.000Z",
                "userID": 1
            }]
        })).toEqual(exampleStateRecords1);
    })

    it('should handle GET_RECORDS_FROM_USER_SUCCESS action with initial state records not empty', () => {
        expect(reducers.recordsReducer(pendingStateRecords2, {
            type: GET_RECORDS_FROM_USER_SUCCESS, 
            payload: [
                {id: 21, foodName: 'queso', gramAmount: 100, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1},
                {id: 22, foodName: 'carne', gramAmount: 150, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1},
                {id: 23, foodName: 'jamon', gramAmount: 200, dateEaten: '2021-09-09T00:00:00.000Z', userID: 1}
            ]
        })).toEqual(exampleStateRecords2);
    })

    it('should handle GET_RECORDS_FROM_USER_FAILED action with initial state records empty', () => {
        expect(reducers.recordsReducer(pendingStateRecords1, {type: GET_RECORDS_FROM_USER_FAILED, payload: 'Error'})).toEqual({...initialStateRecords, error: 'Error'});
    })

    it('should handle GET_RECORDS_FROM_USER_FAILED action with initial state records not empty', () => {
        expect(reducers.recordsReducer(pendingStateRecords2, {type: GET_RECORDS_FROM_USER_FAILED, payload: 'Error'})).toEqual({...pendingStateRecords2, isPending: false, error: 'Error'});
    })
})

describe('DELETE_RECORD', () => {
    it('should handle DELETE_RECORD_PENDING action', () => {
        expect(reducers.recordsReducer(initialStateRecords, {type: DELETE_RECORD_PENDING})).toEqual(pendingStateRecords1);
    })

    it('should handle DELETE_RECORD_SUCCESS action', () => {
        expect(reducers.recordsReducer(pendingStateRecords2, {
            type: DELETE_RECORD_SUCCESS,
            payload: {message: 'Record was deleted succesfully', deletedRecordID: 22}
        })).toEqual(exampleStateRecords1);
    })

    it('should handle DELETE_RECORD_FAILED action', () => {
        expect(reducers.recordsReducer(pendingStateRecords2, {type: DELETE_RECORD_FAILED, payload: 'Error'})).toEqual({...pendingStateRecords2, isPending: false, error: 'Error'});
    })
})