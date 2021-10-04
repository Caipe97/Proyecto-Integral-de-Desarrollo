
import { shallow } from 'enzyme';
import FoodsSearchBar from './FoodsSearchBar';
import React from 'react';
import { Combobox } from 'react-widgets';

describe('FoodsSearchBar tests', () => {
    const historyMock = { push: jest.fn() };
    let wrapper;
    let mockProps;
    beforeEach(() => {
          mockProps = {
            meal: {
                FoodList:[
                    {quantity: 1, food: {foodId: 1, name: 'Milanesa', 
                    recommendedServing: 85, caloriesPerServing: 198, 
                    createdAt: '2021-09-15T19:58:04.486Z'}}, 
                ]
            },
            state : {
                busquedaNombre: '',
                busquedaCategoria: '',
                alimentos: [],
                categorias: [],
                columnas:[],
                cantidadAlimentos: 0,
                cantidadCategorias: 0
              },
        
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
        wrapper = shallow(<FoodsSearchBar {...mockProps} history={historyMock}>
                    <Combobox/>
            </FoodsSearchBar>);
      //  wrapper2 = shallow(<FoodsSearchBar {...mockProps2} history={historyMock}/>);
     })
    it('expect to render FoodsSearchBar component to render with signing in sin comida', () => {
        expect(wrapper).toMatchSnapshot();
    })
    // it('expect to change  onclick buttons', () => {
       
    //     wrapper.find('img').at(0).simulate('click');
    //        // await wrapper.find('[type="button"]').at(2).simulate('click');
               
    // })
   
})