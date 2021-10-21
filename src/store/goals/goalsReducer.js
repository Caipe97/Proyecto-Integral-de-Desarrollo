import {
    ADD_OBJECTIVE_TO_CURRENT_GOAL,
    REMOVE_OBJECTIVE_FROM_CURRENT_GOAL,
    CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START,
    RESET_CURRENT_GOAL,

    ADD_GOAL_PENDING,
    ADD_GOAL_SUCCESS,
    ADD_GOAL_FAILED,

    GET_GOALS_FROM_USER_PENDING,
    GET_GOALS_FROM_USER_SUCCESS,
    GET_GOALS_FROM_USER_FAILED,

    DELETE_GOAL_PENDING,
    DELETE_GOAL_SUCCESS,
    DELETE_GOAL_FAILED
 } from './goalsConstants';

const initialStateGoals = {
  goals: [],
  currentGoal: {objectives: []},
  isPending: false
}

export const goalsReducer = (state=initialStateGoals, action={}) => {
  switch (action.type) {
    case ADD_OBJECTIVE_TO_CURRENT_GOAL:
      let copyCurrentGoalObjectives = [...state.currentGoal.objectives];
      let flag = 0;
      copyCurrentGoalObjectives.forEach(objective => {
        if(objective.foodCategoryId === action.payload.foodCategoryId){
          objective.objectiveCalories += action.payload.objectiveCalories
          flag++;
        }
      })
      if(flag === 0){
        copyCurrentGoalObjectives.push(action.payload);
      }
      return{
        ...state,
        currentGoal: {...state.currentGoal, objectives: copyCurrentGoalObjectives}
      }
    case REMOVE_OBJECTIVE_FROM_CURRENT_GOAL:
      const objectiveToDelete = action.payload;
      let copyCurrentGoalObjectives2 = [...state.currentGoal.objectives];
      copyCurrentGoalObjectives2 = copyCurrentGoalObjectives2.filter(objective => objective.foodCategoryId !== objectiveToDelete.foodCategoryId);
      return{
        ...state,
        currentGoal: {...state.currentGoal, objectives: copyCurrentGoalObjectives2}
      }
    case CHANGE_CURRENT_GOAL_NAME_TOTAL_CALORIES_AND_DATE_START:
      const newCurrentGoal = state.currentGoal;
      newCurrentGoal.name = action.payload.newName;
      newCurrentGoal.totalCalories = action.payload.newTotalCalories;
      newCurrentGoal.dateStart = action.payload.newDateStart;
      return {
        ...state,
        currentGoal: newCurrentGoal
      }
    case RESET_CURRENT_GOAL:
      return {
        ...state,
        currentGoal: {objectives: []}
      }
    case ADD_GOAL_PENDING:
      return {
        ...state,
        isPending: true
      }
    case ADD_GOAL_SUCCESS:
      return {
        ...state,
        goals: action.payload,
        isPending: false
      }
    case ADD_GOAL_FAILED:
      return {
        ...state,
        error: action.payload,
        isPending: false
      }
    case GET_GOALS_FROM_USER_PENDING:
      return {
        ...state,
        isPending: true
      }
    case GET_GOALS_FROM_USER_SUCCESS:
      return {
        ...state,
        goals: action.payload,
        isPending: false
      }
    case GET_GOALS_FROM_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        isPending: false
      }
    case DELETE_GOAL_PENDING:
      return {
        ...state,
        isPending: true
      }
    case DELETE_GOAL_SUCCESS:
      return {
        ...state,
        goals: action.payload,
        isPending: false
      }
    case DELETE_GOAL_FAILED:
      return {
        ...state,
        error: action.payload,
        isPending: false
      }
    default:
      return state
  }
}