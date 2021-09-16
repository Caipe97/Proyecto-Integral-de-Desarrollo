import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMeal, getMealsFromUser, deleteMeal, addFoodToCurrentMeal, removeFoodFromCurrentMeal, resetCurrentMeal } from '../../store/meals/mealsActions';
import './Meals.css';
import { logout } from '../../store/userData/userDataActions';
import MealsMainPage from '../../components/MealsMainPage';

const mapStateToProps = (state) => {
  return {
    userId: state.userDataReducer.userId,
    meals: state.mealsReducer.meals,
    currentMeal: state.mealsReducer.currentMeal,
    isPending: state.mealsReducer.isPending,
    foods: state.foodsReducer.foods
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMeal: (userId, foodName, gramAmount, dateEaten) => dispatch(addMeal(userId, foodName, gramAmount, dateEaten)),
    onGetMealsFromUser: (userId) => dispatch(getMealsFromUser(userId)),
    onDeleteMeal: (mealId) => dispatch(deleteMeal(mealId)),
    onAddFoodToCurrentMeal: (food) => dispatch(addFoodToCurrentMeal(food)),
    onRemoveFoodFromCurrentMeal: (food) => dispatch(removeFoodFromCurrentMeal(food)),
    onLogout: () => dispatch(logout()),
    onResetCurrentMeal: () => dispatch(resetCurrentMeal())
  }
}

class Meals extends Component{
  render() {
    return (
      <MealsMainPage {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meals)
