import {
    ADD_RECORD_PENDING,
    ADD_RECORD_SUCCESS,
    ADD_RECORD_FAILED,
  
    GET_RECORDS_FROM_USER_PENDING,
    GET_RECORDS_FROM_USER_SUCCESS,
    GET_RECORDS_FROM_USER_FAILED,
  
    DELETE_RECORD_PENDING,
    DELETE_RECORD_SUCCESS,
    DELETE_RECORD_FAILED
   } from './recordsConstants'

import * as reducers from './recordsReducer';

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