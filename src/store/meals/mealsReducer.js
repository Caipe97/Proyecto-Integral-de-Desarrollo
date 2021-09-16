import {
  ADD_MEAL_PENDING,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILED,

  GET_MEALS_FROM_USER_PENDING,
  GET_MEALS_FROM_USER_SUCCESS,
  GET_MEALS_FROM_USER_FAILED,

  DELETE_MEAL_PENDING,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILED,

  ADD_FOOD_TO_CURRENT_MEAL,
  REMOVE_FOOD_FROM_CURRENT_MEAL,
  RESET_CURRENT_MEAL
 } from './mealsConstants';

const initialStateMeals = {
  meals: [],
  currentMeal: {foodsAndQuantity: []},
  isPending: false
}

export const mealsReducer = (state=initialStateMeals, action={}) => {
  switch (action.type) {
    case ADD_MEAL_PENDING:
      return {
        ...state,
        isPending: true
      }
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        meals: state.meals.concat(action.payload),
        isPending: false
      }
    case ADD_MEAL_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
      case GET_MEALS_FROM_USER_PENDING:
        return {
          ...state,
          isPending: true
        }
      case GET_MEALS_FROM_USER_SUCCESS:
        console.log(action.payload)
        return {
          ...state,
          meals: action.payload,
          isPending: false
        }
      case GET_MEALS_FROM_USER_FAILED:
        return {
          ...state,
          isPending: false,
          error: action.payload
        }
        case DELETE_MEAL_PENDING:
          return {
            ...state,
            isPending: true
          }
        case DELETE_MEAL_SUCCESS:
          return {
            ...state,
            meals: state.meals.filter((meal) => meal.mealId !== action.payload.deletedMealId),
            isPending: false
          }
        case DELETE_MEAL_FAILED:
          return {
            ...state,
            isPending: false,
            error: action.payload
          }
        case ADD_FOOD_TO_CURRENT_MEAL:
          const food = action.payload;
          const newCurrentMealFoodsAndQuantityAddFood = getNewCurrentMealFoodsAndQuantityAddFood(state.currentMeal.foodsAndQuantity, food);
          return {
            ...state,
            currentMeal: {...state.currentMeal, foodsAndQuantity: newCurrentMealFoodsAndQuantityAddFood}
          }
        case REMOVE_FOOD_FROM_CURRENT_MEAL:
          const foodAndQuantity = action.payload;
          const newCurrentMealFoodsAndQuantityRemoveFood = getNewCurrentMealFoodsAndQuantityRemoveFood(state.currentMeal.foodsAndQuantity, foodAndQuantity.food);
          return {
            ...state,
            currentMeal: {...state.currentMeal, foodsAndQuantity: newCurrentMealFoodsAndQuantityRemoveFood}
          }
        case RESET_CURRENT_MEAL:
          return {
            ...state,
            currentMeal: {foodsAndQuantity: []}
          }
    default:
      return state
  }
}

const getNewCurrentMealFoodsAndQuantityAddFood = (currentMealFoodsAndQuantity, food) => {
  let flag = 0;
  const copyCurrentMealFoods = currentMealFoodsAndQuantity
  copyCurrentMealFoods.forEach(foodAndQuantity => {
    if(food.foodId === foodAndQuantity.food.foodId){
      foodAndQuantity.quantity++
      flag++;
    }
  });
  if(flag === 0){
    copyCurrentMealFoods.push({quantity: 1, food});
  }
  return copyCurrentMealFoods;
}

const getNewCurrentMealFoodsAndQuantityRemoveFood = (currentMealFoodsAndQuantity, food) => {
  const copyCurrentMealFoods = currentMealFoodsAndQuantity
  console.log(food)
  for( let i = 0; i < copyCurrentMealFoods.length; i++){
    console.log(copyCurrentMealFoods[i].food.foodId, food.foodId)
    if(copyCurrentMealFoods[i].food.foodId === food.foodId) { 
      if(copyCurrentMealFoods[i].quantity === 1){
        copyCurrentMealFoods.splice(i, 1); 
      } else {
        copyCurrentMealFoods[i].quantity--;
      }
    }
  }
  return copyCurrentMealFoods;
}