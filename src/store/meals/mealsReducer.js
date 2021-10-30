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
  RESET_CURRENT_MEAL,

  UPDATE_CURRENT_MEAL_IN_STATE,

  CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN,

  UPDATE_CURRENT_MEAL_PENDING,
  UPDATE_CURRENT_MEAL_SUCCESS,
  UPDATE_CURRENT_MEAL_FAILED,

  GET_MEALS_BY_PERIOD_PENDING,
  GET_MEALS_BY_PERIOD_SUCCESS,
  GET_MEALS_BY_PERIOD_FAILED,

  GET_LAST_YEARS_MEALS_PENDING,
  GET_LAST_YEARS_MEALS_SUCCESS,
  GET_LAST_YEARS_MEALS_FAILED
 } from './mealsConstants';

const initialStateMeals = {
  meals: [],
  currentMeal: {FoodList: []},
  mealsByPeriod: [],
  lastYearsMeals: {},
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
        meals: action.payload,
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
        meals: action.payload,
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
      const newCurrentMealFoodListAddFood = getNewCurrentMealFoodListAddFood(state.currentMeal.FoodList, food);
      return {
        ...state,
        currentMeal: {...state.currentMeal, FoodList: newCurrentMealFoodListAddFood}
      }
    case REMOVE_FOOD_FROM_CURRENT_MEAL:
      const FoodList = action.payload;
      const newCurrentMealFoodListRemoveFood = getNewCurrentMealFoodListRemoveFood(state.currentMeal.FoodList, FoodList.food);
      return {
        ...state,
        currentMeal: {...state.currentMeal, FoodList: newCurrentMealFoodListRemoveFood}
      }
    case RESET_CURRENT_MEAL:
      return {
        ...state,
        currentMeal: {FoodList: []}
      }
    case CHANGE_CURRENT_MEAL_NAME_AND_DATE_EATEN:
      const newCurrentMeal = state.currentMeal;
      newCurrentMeal.name = action.payload.newName;
      newCurrentMeal.dateEaten = action.payload.newDateEaten;
      return {
        ...state,
        currentMeal: newCurrentMeal
      }
    case UPDATE_CURRENT_MEAL_IN_STATE:
      return {
        ...state,
        currentMeal: action.payload
      }
    case UPDATE_CURRENT_MEAL_PENDING:
      return {
        ...state,
        isPending: true
      }
    case UPDATE_CURRENT_MEAL_SUCCESS:
      return {
        ...state,
        meals: action.payload,
        isPending: false
      }
    case UPDATE_CURRENT_MEAL_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case GET_MEALS_BY_PERIOD_PENDING:
      return {
        ...state,
        isPending: true
      }
    case GET_MEALS_BY_PERIOD_SUCCESS:
      return {
        ...state,
        mealsByPeriod: action.payload,
        isPending: false
      }
    case GET_MEALS_BY_PERIOD_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    case GET_LAST_YEARS_MEALS_PENDING:
      return {
        ...state,
        isPending: true
      }
    case GET_LAST_YEARS_MEALS_SUCCESS:
      const lastYearsMealsAux = {
        labels: action.payload.labels,
        datasets: [
          {
            label: 'Calorias por mes',
            data: action.payload.data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
            ]
          },
        ],
      }
      return {
        ...state,
        lastYearsMeals: lastYearsMealsAux,
        isPending: false
      }
    case GET_LAST_YEARS_MEALS_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    default:
      return state
  }
}

const getNewCurrentMealFoodListAddFood = (currentMealFoodList, food) => {
  let flag = 0;
  const copyCurrentMealFoods = currentMealFoodList
  copyCurrentMealFoods.forEach(FoodList => {
    if(food.foodId === FoodList.food.foodId){
      FoodList.quantity++
      flag++;
    }
  });
  if(flag === 0){
    copyCurrentMealFoods.push({quantity: 1, food});
  }
  return copyCurrentMealFoods;
}

const getNewCurrentMealFoodListRemoveFood = (currentMealFoodList, food) => {
  const copyCurrentMealFoods = currentMealFoodList
 // console.log(food, currentMealFoodList)
  for( let i = 0; i < copyCurrentMealFoods.length; i++){
    //console.log(copyCurrentMealFoods[i].food.foodId, food.foodId)
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