import React from 'react';
import { shallow } from 'enzyme';
import FoodCategoriesSearchBar from './FoodCategoriesSearchBar';

describe('FoodCategoriesSearchBar tests', () => {
    const historyMock = { push: jest.fn() };
    const mockPropsSignIn = {
        userId: 1, 
        onLogout: jest.fn()};
    let wrapper;
    const mockPropsSignIn2 = {
        userId: 0, 
        onLogout: jest.fn(),
        userId: 1,state : {
            busquedaNombre: '',
            busquedaCategoria: '',
            alimentos: [],
            categorias: [],
            columnas:[],
            cantidadAlimentos: 0,
            cantidadCategorias: 0
          },
            meals:[
                {mealId: 21, name: 'queso', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 22, name: 'carne', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 23, name: 'jamon', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
            ],
            meal: {
                FoodList:[
                    {quantity: 1, food: {foodId: 1, name: 'Milanesa', 
                    recommendedServing: 85, caloriesPerServing: 198, 
                    createdAt: '2021-09-15T19:58:04.486Z'}}, 
                ]
            },
            foods: [
                {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'},
                {foodId: 2, name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, createdAt: '2021-09-15T20:02:16.490Z'}
            ],
                foodCategories:[
                        {
                          foodCategoryId: 1,
                          name: "Fruta",
                          createdAt: "2021-09-30T14:09:34.756Z",
                          updatedAt: "2021-09-30T14:09:34.756Z",
                          userId: null
                        },
                        {
                          foodCategoryId: 7,
                          name: "Fideos",
                          createdAt: "2021-09-30T18:58:58.542Z",
                          updatedAt: "2021-09-30T18:58:58.542Z",
                          userId: null
                        }
                      ],
        
        onAddMeal: jest.fn(),
        onGetMealsFromUser:jest.fn(),
        onDeleteMeal: jest.fn(),
        onGetAllFoods:jest.fn(),
        onAddFoodToCurrentMeal: jest.fn(),
        onRemoveFoodFromCurrentMeal:jest.fn(),
        onLogout: jest.fn(),
        onResetCurrentMeal: jest.fn(),
        onUpdateCurrentMeal:jest.fn(),
        onChangeCurrentMealNameAndDateEaten:jest.fn(),    
        onAddCustomFood:jest.fn(), 
        onEditCustomFood:jest.fn(),
        onDeleteCustomFood:jest.fn(),
        onGetFoodCategories: jest.fn(),
        onCreateCategory: jest.fn(),
        onDeleteCategory: jest.fn(),
        onEditCategory: jest.fn(),
        preventDefault:  jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<FoodCategoriesSearchBar {...mockPropsSignIn2} />);
         
    })

    it('expect to render FoodCategoriesSearchBar component to location state ', async() => {
        expect(wrapper).toMatchSnapshot();//if
        await wrapper.instance().componentDidMount();
    })
    // it('expect to render FoodCategoriesSearchBar component to location state2 ', async() => {
    //     expect(wrapper).toMatchSnapshot();//if
    //     await wrapper.instance().componentDidMount();
    //     await wrapper.instance().componentDidUpdate();
    // })
    // it('OnChange expect t11', async () => {

    //     // jest.useFakeTimers();
    //     await wrapper.find('[type="button"]').at(0).simulate('click',jest.fn);
        
    //     wrapper.find('[type="button"]').at(0).simulate('click',{ persist: jest.fn()});
    //     //
        
    //     //expect(wrapper.find('filtrarElementos').instance()).toHaveBeenCalledTimes(1);
    // })
    
})
        //wrapper.find('a').simulate('blur', wrapper.find('a').simulate('blur', { persist: jest.fn()}););
