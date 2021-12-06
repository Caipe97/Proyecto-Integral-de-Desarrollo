import {
  LOGOUT,
  REFRESH_PAGE,

  LOGIN_OR_REGISTER_PENDING,
  LOGIN_OR_REGISTER_SUCCESS,
  LOGIN_OR_REGISTER_FAILED,

  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
 } from './userDataConstants'

export const logout = () => ({ 
  type: LOGOUT
})

export const refreshPage = () => ({ 
  type: REFRESH_PAGE
})

export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_OR_REGISTER_PENDING })
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/users/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
  )
  .then(response => response.json())
  .then(userData => dispatch({ type: LOGIN_OR_REGISTER_SUCCESS, payload: userData }))
  .catch(error => dispatch({ type: LOGIN_OR_REGISTER_FAILED, payload: error }))
}

export const register = (name, surname, email, password, gender, birthday, weight, height) => (dispatch) => {
  dispatch({ type: LOGIN_OR_REGISTER_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/users/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        password: password,
        gender: gender,
        birthday: birthday,
        weight: weight,
        height: height
      })
    })
  )
  .then(response => response.json())
  .then(userData => dispatch({ type: LOGIN_OR_REGISTER_SUCCESS, payload: userData }))
  .catch(error => dispatch({ type: LOGIN_OR_REGISTER_FAILED, payload: error }))
}

export const resetPassword = (userId, password) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_PENDING });
  return(
    fetch(`https://jma-test-app.herokuapp.com/api/users?userId=${userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: password
      })
    })
  )
  .then(response => response.json())
  .then(userData => dispatch({ type: RESET_PASSWORD_SUCCESS, payload: userData }))
  .catch(error => dispatch({ type: RESET_PASSWORD_FAILED, payload: error }))
}