import {
    ADD_OBJECTIVE_TO_CURRENT_GOAL,
    REMOVE_OBJECTIVE_FROM_CURRENT_GOAL,
    CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START,
    RESET_CURRENT_GOAL,
    UPDATE_CURRENT_GOAL_IN_STATE,

    ADD_GOAL_PENDING,
    ADD_GOAL_SUCCESS,
    ADD_GOAL_FAILED,

    GET_GOALS_FROM_USER_PENDING,
    GET_GOALS_FROM_USER_SUCCESS,
    GET_GOALS_FROM_USER_FAILED,

    DELETE_GOAL_PENDING,
    DELETE_GOAL_SUCCESS,
    DELETE_GOAL_FAILED,

    UPDATE_CURRENT_GOAL_PENDING,
    UPDATE_CURRENT_GOAL_SUCCESS,
    UPDATE_CURRENT_GOAL_FAILED
} from './goalsConstants'

import API_URL from '../../env';

export const addObjectiveToCurrentGoal = (objective) => ({ 
    type: ADD_OBJECTIVE_TO_CURRENT_GOAL,
    payload: objective
})

export const removeObjectiveFromCurrentGoal = (objective) => ({ 
    type: REMOVE_OBJECTIVE_FROM_CURRENT_GOAL,
    payload: objective
})

export const changeCurrentGoalNameTotalCaloriesAndDateStart = (newName, newTotalCalories, newDateStart) => ({
    type: CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START,
    payload: {newName, newTotalCalories, newDateStart}
})

export const resetCurrentGoal = () => ({
    type: RESET_CURRENT_GOAL
})

export const updateCurrentGoalInState = (newCurrentGoal) => ({
  type: UPDATE_CURRENT_GOAL_IN_STATE,
  payload: newCurrentGoal
})

export const addGoal = (userId, currentGoal) => (dispatch) => {
    dispatch({ type: ADD_GOAL_PENDING });
    return(
      fetch(`${API_URL}/api/goals?userId=${userId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: currentGoal.name,
            dateStart: currentGoal.dateStart,
            totalCalories: currentGoal.totalCalories,
            objectives: currentGoal.objectives
        })
      })
    )
    .then(response => response.json())
    .then(goalsData => dispatch({ type: ADD_GOAL_SUCCESS, payload: goalsData }))
    .catch(error => dispatch({ type: ADD_GOAL_FAILED, payload: error }))
}

export const getGoalsFromUser = (userId) => (dispatch) => {
    dispatch({ type: GET_GOALS_FROM_USER_PENDING });
    return(
      fetch(`${API_URL}/api/goals?userId=${userId}`)
    )
    .then(response => response.json())
    .then(goalsData => dispatch({ type: GET_GOALS_FROM_USER_SUCCESS, payload: goalsData }))
    .catch(error => dispatch({ type: GET_GOALS_FROM_USER_FAILED, payload: error }))
}

export const deleteGoal = (goalId, userId) => (dispatch) => {
    dispatch({ type: DELETE_GOAL_PENDING });
    return(
      fetch(`${API_URL}/api/goals?goalId=${goalId}&userId=${userId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      })
    )
    .then(response => response.json())
    .then(goalsData => dispatch({ type: DELETE_GOAL_SUCCESS, payload: goalsData }))
    .catch(error => dispatch({ type: DELETE_GOAL_FAILED, payload: error }))
}

export const updateCurrentGoal = (userId, currentGoal) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_GOAL_PENDING });
  return(
    fetch(`${API_URL}/api/goals?goalId=${currentGoal.goalId}&userId=${userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          name: currentGoal.name,
          dateStart: currentGoal.dateStart,
          totalCalories: currentGoal.totalCalories,
          objectives: currentGoal.objectives
      })
    })
  )
  .then(response => response.json())
  .then(goalsData => dispatch({ type: UPDATE_CURRENT_GOAL_SUCCESS, payload: goalsData }))
  .catch(error => dispatch({ type: UPDATE_CURRENT_GOAL_FAILED, payload: error }))
}