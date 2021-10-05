import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMealsFromUser, deleteMeal, updateCurrentMealInState, getMealsByPeriod } from '../../store/meals/mealsActions';
import { getFoodCategories } from '../../store/foods/foodsActions';
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
    foodCategories: state.foodsReducer.foodCategories
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
