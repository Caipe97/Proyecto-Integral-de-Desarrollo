import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGoal, resetCurrentGoal, updateCurrentGoal, changeCurrentGoalNameTotalCaloriesAndDateStart } from '../../store/goals/goalsActions';
import { getAllFoods, getFoodCategories } from'../../store/foods/foodsActions';
import { addObjectiveToCurrentGoal, removeObjectiveFromCurrentGoal } from'../../store/goals/goalsActions';
import './Goals.css';
import { logout, refreshPage } from '../../store/userData/userDataActions';
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
    onAddGoal: (userId, currentGoal) => dispatch(addGoal(userId, currentGoal)),
    onGetAllFoods: (userId) => dispatch(getAllFoods(userId)),
    onLogout: () => dispatch(logout()),
    onRefreshPage: () => dispatch(refreshPage()),
    onResetCurrentGoal: () => dispatch(resetCurrentGoal()),
    onChangeCurrentGoalNameTotalCaloriesAndDateStart: (newName, newTotalCalories, newDateStart) => dispatch(changeCurrentGoalNameTotalCaloriesAndDateStart(newName, newTotalCalories, newDateStart)),
    onGetFoodCategories: (userId) => dispatch(getFoodCategories(userId)),
    onRemoveObjectiveFromCurrentGoal: (food) => dispatch(removeObjectiveFromCurrentGoal(food)),
    onUpdateCurrentGoal: (userId, newCurrentGoal) => dispatch(updateCurrentGoal(userId, newCurrentGoal)),
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
