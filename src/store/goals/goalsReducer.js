import {
    ADD_OBJECTIVE_TO_CURRENT_GOAL,
    REMOVE_OBJECTIVE_FROM_CURRENT_GOAL
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
    default:
      return state
  }
}