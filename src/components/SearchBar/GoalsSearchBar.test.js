import React from 'react';
import { shallow } from 'enzyme';
import GoalsSearchBar from './GoalsSearchBar';

describe('GoalsSearchBar tests', () => {
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
               
          goals:[  { name: 'Plan febrero',dateStart: "2021-09-02T00:00:00.000Z",totalCalories: 3000,objectives: []},
          { name: 'Plan enero',dateStart: "2021-09-01T00:00:00.000Z",totalCalories: 7000,objectives: []},   
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
        preventDefault:  jest.fn(),
        onAddObjectiveToCurrentGoal: jest.fn(),
        onAddGoal: jest.fn(),
        onGetGoalsFromUser:jest.fn(),
        onResetCurrentGoal: jest.fn(),
        onChangeCurrentGoalNameTotalCaloriesAndDateStart: jest.fn(),
      
        onRemoveObjectiveFromCurrentGoal: jest.fn(),
        onUpdateCurrentGoal: jest.fn(),
        filtrarELementos:jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<GoalsSearchBar {...mockPropsSignIn2} history={historyMock} />);
         
    })

    it('expect to render GoalsSearchBar component to location state ', async() => {
        expect(wrapper).toMatchSnapshot();//if
        await wrapper.instance().componentDidMount();
    })
    it('expect to render GoalsSearchBar component to location state2 ', async() => {
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
        expect(historyMock.push.mock.calls[0]).toEqual(['/goals']);
    })
    // it('OnChange should because name contains search value',() => {
    //     wrapper.find('input').at(0).simulate('change', { target: { name: 'busqueda', value: 'enero' } });
    //     //wrapper.instance().filtrarElementos();

    // expect(wrapper.props.filtrarELementos).toHaveBeenCalledTimes(0);
    // })
})
        //wrapper.find('a').simulate('blur', wrapper.find('a').simulate('blur', { persist: jest.fn()}););
