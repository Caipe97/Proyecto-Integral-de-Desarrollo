import {
  LOGIN_OR_REGISTER_PENDING,
  LOGIN_OR_REGISTER_SUCCESS,
  LOGIN_OR_REGISTER_FAILED
 } from './constants'


// export const setSearchField = (text) => ({ 
//   type: CHANGE_SEARCHFIELD, 
//   payload: text 
// })

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






// export const getData = (id) => (dispatch) => {
//   dispatch({ type: GET_OR_POST_PUT_DATA_PENDING });
//   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//     .then(response => response.json())
//     .then(userData => dispatch({ type: GET_OR_POST_PUT_DATA_SUCCESS, payload: userData }))
//     .catch(error => dispatch({ type: GET_OR_POST_PUT_DATA_FAILED, payload: error }))
// }

// export const postData = (title, body, userId) => (dispatch) => {
//   dispatch({ type: GET_OR_POST_PUT_DATA_PENDING });
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       title: title,
//       body: body,
//       userId: userId,
//     })})
//     .then(response => response.json())
//     .then(userData => dispatch({ type: GET_OR_POST_PUT_DATA_SUCCESS, payload: userData }))
//     .catch(error => dispatch({ type: GET_OR_POST_PUT_DATA_FAILED, payload: error }))
// }

// export const putData = (id, title, body, userId) => (dispatch) => {
//   dispatch({ type: GET_OR_POST_PUT_DATA_PENDING });
//   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     method: 'PUT',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       id: id,
//       title: title,
//       body: body,
//       userId: userId,
//     })})
//     .then(response => response.json())
//     .then(userData => dispatch({ type: GET_OR_POST_PUT_DATA_SUCCESS, payload: userData }))
//     .catch(error => dispatch({ type: GET_OR_POST_PUT_DATA_FAILED, payload: error }))
// }

// export const deleteData = (id) => (dispatch) => {
//   dispatch({ type: DELETE_DATA_PENDING });
//   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(userData => dispatch({ type: DELETE_DATA_SUCCESS, payload: userData }))
//     .catch(error => dispatch({ type: DELETE_DATA_FAILED, payload: error }))
// }