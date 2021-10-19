import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addGoal, deleteGoal, editGoal, getGoalsFromUser, resetCurrentGoal, updateCurrentGoal, changeCurrentGoalNameAndDateEaten } from '../../store/meals/mealsActions';
import { getAllFoods, getFoodCategories } from'../../store/foods/foodsActions';
import { addObjectiveToCurrentGoal, removeObjectiveFromCurrentGoal } from'../../store/goals/goalsActions';
import './Goals.css';
// import { logout } from '../../store/userData/userDataActions';
import GoalsMainPage from '../../components/GoalsMainPage/GoalsMainPage';

const mapStateToProps = (state) => {
  return {
    userId: state.userDataReducer.userId,
    goals: state.goalsReducer.goals,
    currentGoal: state.goalsReducer.currentGoal,
    isPending: state.goalsReducer.isPending,
    foods: state.foodsReducer.foods,
    foodCategories: state.foodsReducer.foodCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddObjectiveToCurrentGoal: (objective) => dispatch(addObjectiveToCurrentGoal(objective)),
    // onAddGoal: (userId, goal) => dispatch(addGoal(userId, goal)),
    // onDeleteGoal: (goalId) => dispatch(deleteGoal(goalId)),
    // onEditGoal: (goalId) => dispatch(editGoal(goalId)),
    // onGetGoalsFromUser: (userId) => dispatch(getGoalsFromUser(userId)),
    onGetAllFoods: (userId) => dispatch(getAllFoods(userId)),
    // onLogout: () => dispatch(logout()),
    // onResetCurrentGoal: () => dispatch(resetCurrentGoal()),
    // onUpdateCurrentGoal: (goal) => dispatch(updateCurrentGoal(goal)),
    // onChangeCurrentGoalNameAndDateEaten: (newName, newDateEaten) => dispatch(changeCurrentGoalNameAndDateEaten(newName, newDateEaten)),
    onGetFoodCategories: (userId) => dispatch(getFoodCategories(userId)),
    // onAddObjectiveToCurrentGoal: (objective) => dispatch(addObjectiveToCurrentGoal(objective)),
    onRemoveObjectiveFromCurrentGoal: (food) => dispatch(removeObjectiveFromCurrentGoal(food)),
  }
}

class Goals extends Component{
  render() {
    return (
      <GoalsMainPage {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals)
