import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMealsFromUser, deleteMeal, updateCurrentMealInState, getMealsByPeriod, getLastYearsMeals } from '../../store/meals/mealsActions';
import { getFoodCategories } from '../../store/foods/foodsActions';
import { getGoalsFromUser, deleteGoal } from '../../store/goals/goalsActions';
import { logout } from '../../store/userData/userDataActions';
import ProfileMainPage from '../../components/ProfileMainPage/ProfileMainPage';

const mapStateToProps = (state) => {
  return {
    userId: state.userDataReducer.userId,
    name: state.userDataReducer.name,
    surname: state.userDataReducer.surname,
    email: state.userDataReducer.email,
    password: state.userDataReducer.password,
    gender: state.userDataReducer.gender,
    birthday: state.userDataReducer.birthday,
    weight: state.userDataReducer.weight,
    height: state.userDataReducer.height,
    isPending: state.userDataReducer.isPending,
    meals: state.mealsReducer.meals,
    mealsByPeriod: state.mealsReducer.mealsByPeriod,
    foodCategories: state.foodsReducer.foodCategories,
    lastYearsMeals: state.mealsReducer.lastYearsMeals,
    goals: state.goalsReducer.goals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMealsFromUser: (userId) => dispatch(getMealsFromUser(userId)),
    onDeleteMeal: (mealId, userId) => dispatch(deleteMeal(mealId, userId)),
    onUpdateCurrentMealInState: (newCurrentMeal) => dispatch(updateCurrentMealInState(newCurrentMeal)),
    onLogout: () => dispatch(logout()),
    onGetMealsByPeriod: (userId, dateStart, dateEnd) => dispatch(getMealsByPeriod(userId, dateStart, dateEnd)),
    onGetFoodCategories: (userId) => dispatch(getFoodCategories(userId)),
    onGetLastYearsMeals: (userId) => dispatch(getLastYearsMeals(userId)),
    onGetGoalsFromUser: (userId) => dispatch(getGoalsFromUser(userId)),
    onDeleteGoal: (goalId, userId) => dispatch(deleteGoal(goalId, userId))
  }
}

class Profile extends Component{
  render() {
    return (
      <ProfileMainPage {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
