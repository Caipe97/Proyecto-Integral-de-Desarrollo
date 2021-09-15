import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMeal, getMealsFromUser, deleteMeal } from '../../store/meals/mealsActions';
import './Meals.css';
import { logout } from '../../store/userData/userDataActions';
import MealsMainPage from '../../components/MealsMainPage';

const mapStateToProps = (state) => {
  return {
    userId: state.userDataReducer.userId,
    meals: state.mealsReducer.meals,
    isPending: state.mealsReducer.isPending,
    foods: state.foodsReducer.foods
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMeal: (userId, foodName, gramAmount, dateEaten) => dispatch(addMeal(userId, foodName, gramAmount, dateEaten)),
    onGetMealsFromUser: (userId) => dispatch(getMealsFromUser(userId)),
    onDeleteMeal: (mealId) => dispatch(deleteMeal(mealId)),
    onLogout: () => dispatch(logout())
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
