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

export const addRecord = (id, foodName, gramAmount, dateEaten) => (dispatch) => {
  dispatch({ type: ADD_RECORD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/records`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userID: id,
        foodName: foodName,
        gramAmount: gramAmount,
        dateEaten: dateEaten
      })
    })
  )
  .then(response => response.json())
  .then(recordsData => dispatch({ type: ADD_RECORD_SUCCESS, payload: recordsData }))
  .catch(error => dispatch({ type: ADD_RECORD_FAILED, payload: error }))
}

export const getRecordsFromUser = (id) => (dispatch) => {
  dispatch({ type: GET_RECORDS_FROM_USER_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/records?userID=${id}`)
  )
  .then(response => response.json())
  .then(recordsData => dispatch({ type: GET_RECORDS_FROM_USER_SUCCESS, payload: recordsData }))
  .catch(error => dispatch({ type: GET_RECORDS_FROM_USER_FAILED, payload: error }))
}

export const deleteRecord = (id) => (dispatch) => {
  dispatch({ type: DELETE_RECORD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/records`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
      })
    })
  )
  .then(response => response.json())
  .then(recordsData => dispatch({ type: DELETE_RECORD_SUCCESS, payload: recordsData }))
  .catch(error => dispatch({ type: DELETE_RECORD_FAILED, payload: error }))
}