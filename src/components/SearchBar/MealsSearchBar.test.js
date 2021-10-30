import React from 'react';
import { shallow } from 'enzyme';
import MealsSearchBar from './MealsSearchBar';

describe('MealsSearchBar tests', () => {
    let wrapper;
    const historyMock = { push: jest.fn() };
    const mockPropsSignIn2 = {
        onLogout: jest.fn(),
        state : {
            busquedaNombre: '',
            busquedaCategoria: '',
            alimentos: [],
            categorias: [],
            columnas:[],
            cantidadAlimentos: 0,
            cantidadCategorias: 0
          },
               
          meals: [
            {
                mealId: 21, name: 'queso',
                FoodList: [{
                    quantity: 1, food:
                    {
                        foodId: 1, name: 'Milanesa',
                        recommendedServing: 85, caloriesPerServing: 198,
                        createdAt: '2021-09-15T19:58:04.486Z'
                    }
                }],
                dateEaten: '2021-09-09T00:00:00.000Z', userId: 1
            },
            {
                mealId: 22, name: 'carne',
                FoodList: [{
                    quantity: 1, food:
                    {
                        foodId: 1, name: 'Milanesa',
                        recommendedServing: 85, caloriesPerServing: 198,
                        createdAt: '2021-09-15T19:58:04.486Z'
                    }
                }],
                dateEaten: '2021-09-09T00:00:00.000Z', userId: 1
            },
        ],
        currentMeal: { FoodList: [] },
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
        preventDefault:  jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<MealsSearchBar {...mockPropsSignIn2} history={historyMock} />);
         
    })

    it('expect to render MealsSearchBar component to location state ', async() => {
        expect(wrapper).toMatchSnapshot();//if
        await wrapper.instance().componentDidMount();
    })
    it('expect to render MealsSearchBar component to location state2 ', async() => {
        expect(wrapper).toMatchSnapshot();//if
        await wrapper.instance().componentDidMount();
        await wrapper.instance().componentDidUpdate();
    })
    it('OnChange expect t11', async () => {

        // jest.useFakeTimers();
        await wrapper.find('[type="button"]').at(0).simulate('click',jest.fn);
        
        wrapper.find('[type="button"]').at(0).simulate('click',{ persist: jest.fn()});
        //
        
        //expect(wrapper.find('filtrarElementos').instance()).toHaveBeenCalledTimes(1);
    })
    it('expect to change  onclick buttons', async () => {
       
        await wrapper.find('button').at(0).simulate('click');
       // await wrapper.find('[type="button"]').at(2).simulate('click');
       expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();
      
    })
    it('Agregar should push to goals ', async () => {
        await wrapper.find('button').at(1).simulate('click', { push: jest.fn() });
       // expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
    })
    // it('OnChange should because name contains search value',() => {
    //     wrapper.find('input').at(0).simulate('change', { target: { name: 'busqueda', value: 'enero' } });
    //     //wrapper.instance().filtrarElementos();

    // expect(wrapper.props.filtrarELementos).toHaveBeenCalledTimes(0);
    // })
})
        //wrapper.find('a').simulate('blur', wrapper.find('a').simulate('blur', { persist: jest.fn()}););
