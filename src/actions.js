import {
  LOGIN_OR_REGISTER_PENDING,
  LOGIN_OR_REGISTER_SUCCESS,
  LOGIN_OR_REGISTER_FAILED,

  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
 } from './constants'



// // export const setSearchField = (text) => ({ 
// //   type: CHANGE_SEARCHFIELD, 
// //   payload: text 
// // })

export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_OR_REGISTER_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/users/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: email,
      password: password
    })})
    .then(response => response.json())
    .then(userData => dispatch({ type: LOGIN_OR_REGISTER_SUCCESS, payload: userData }))
    .catch(error => dispatch({ type: LOGIN_OR_REGISTER_FAILED, payload: error }))
}

export const register = (name, surname, email, password) => (dispatch) => {
  dispatch({ type: LOGIN_OR_REGISTER_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/users/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      password: password
    })})
    .then(response => response.json())
    .then(userData => dispatch({ type: LOGIN_OR_REGISTER_SUCCESS, payload: userData }))
    .catch(error => dispatch({ type: LOGIN_OR_REGISTER_FAILED, payload: error }))
}

export const resetPassword = (id, password) => (dispatch) => {
  console.log(id, password);
  dispatch({ type: RESET_PASSWORD_PENDING });
  fetch(`https://jma-test-app.herokuapp.com/api/users/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      password: password
    })})
    .then(response => response.json())
    .then(userData => dispatch({ type: RESET_PASSWORD_SUCCESS, payload: userData }))
    .catch(error => dispatch({ type: RESET_PASSWORD_FAILED, payload: error }))
}