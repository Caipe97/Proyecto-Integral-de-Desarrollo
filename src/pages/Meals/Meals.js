import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMeal, getMealsFromUser, deleteMeal, addFoodToCurrentMeal, removeFoodFromCurrentMeal, resetCurrentMeal, updateCurrentMeal, changeCurrentMealNameAndDateEaten } from '../../store/meals/mealsActions';
import { getAllFoods, addCustomFood, editCustomFood, deleteCustomFood, getFoodCategories, createCategory, deleteCategory, editCategory } from'../../store/foods/foodsActions';
import './Meals.css';
import { logout } from '../../store/userData/userDataActions';
import MealsMainPage from '../../components/MealsMainPage/MealsMainPage';

const mapStateToProps = (state) => {
  return {
    userId: state.userDataReducer.userId,
    meals: state.mealsReducer.meals,
    currentMeal: state.mealsReducer.currentMeal,
    isPending: state.mealsReducer.isPending,
    foods: state.foodsReducer.foods,
    foodCategories: state.foodsReducer.foodCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMeal: (userId, meal) => dispatch(addMeal(userId, meal)),
    onGetMealsFromUser: (userId) => dispatch(getMealsFromUser(userId)),
    onDeleteMeal: (mealId) => dispatch(deleteMeal(mealId)),
    onGetAllFoods: (userId) => dispatch(getAllFoods(userId)),
    onAddFoodToCurrentMeal: (food) => dispatch(addFoodToCurrentMeal(food)),
    onRemoveFoodFromCurrentMeal: (food) => dispatch(removeFoodFromCurrentMeal(food)),
    onLogout: () => dispatch(logout()),
    onResetCurrentMeal: () => dispatch(resetCurrentMeal()),
    onUpdateCurrentMeal: (meal) => dispatch(updateCurrentMeal(meal)),
    onChangeCurrentMealNameAndDateEaten: (newName, newDateEaten) => dispatch(changeCurrentMealNameAndDateEaten(newName, newDateEaten)),
    onAddCustomFood: (name, recommendedServing, caloriesPerServing, foodCategoryId, userId) => dispatch(addCustomFood(name, recommendedServing, caloriesPerServing, foodCategoryId, userId)),
    onEditCustomFood: (foodId, name, recommendedServing, caloriesPerServing, foodCategoryId) => dispatch(editCustomFood(foodId, name, recommendedServing, caloriesPerServing, foodCategoryId)),
    onDeleteCustomFood: (foodId) => dispatch(deleteCustomFood(foodId)),
    onGetFoodCategories: (userId) => dispatch(getFoodCategories(userId)),
    onCreateCategory: (name, userId) => dispatch(createCategory(name, userId)),
    onDeleteCategory: (foodCategoryId) => dispatch(deleteCategory(foodCategoryId)),
    onEditCategory: (foodCategoryId, name) => dispatch(editCategory(foodCategoryId, name))
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
