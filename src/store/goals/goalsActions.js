import {
    ADD_OBJECTIVE_TO_CURRENT_GOAL,
    REMOVE_OBJECTIVE_FROM_CURRENT_GOAL
} from './goalsConstants'

export const addObjectiveToCurrentGoal = (objective) => ({ 
    type: ADD_OBJECTIVE_TO_CURRENT_GOAL,
    payload: objective
})

export const removeObjectiveFromCurrentGoal = (objective) => ({ 
    type: REMOVE_OBJECTIVE_FROM_CURRENT_GOAL,
    payload: objective
})