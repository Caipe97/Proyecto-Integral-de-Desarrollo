import React from 'react';
import { shallow } from 'enzyme'; 
import MealModal from './MealModal';
import { MyVerticallyCenteredModal } from './MealModal';
import Modal from 'react-bootstrap/Modal';
import {
    DELETE_MEAL_SUCCESS,

    UPDATE_CURRENT_MEAL_IN_STATE,

   
   } from '../../store/meals/mealsConstants'
describe('Modal tests', () => {
    const historyMock = { push: jest.fn(), 
        // meal:{
        // mealId:1,name:'comida1',dateEaten:'2021-09-09T00:00:00.000Z',
        // FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}],
        // }
    };///
    const onDeleteMealSuccess={
        type: DELETE_MEAL_SUCCESS,
        payload: [{mealId: 21, name: 'queso', 
                    FoodList: [{quantity: 1, food:
                                         {foodId: 1, name: 'Milanesa',
                                          recommendedServing: 85, caloriesPerServing: 198, 
                                          createdAt: '2021-09-15T19:58:04.486Z'}}], 
                    dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}]
    };
    const onUpdateCurrentMealInStateSuccess={
        type: UPDATE_CURRENT_MEAL_IN_STATE,
        payload: {FoodList:[ {quantity: 1, food: 
                                        {foodId: 1, name: 'Milanesa', 
                                        recommendedServing: 85, caloriesPerServing: 198, 
                                        createdAt: '2021-09-15T19:58:04.486Z'}}]
                 }
    };
    const mockProps = {
        meal:{
        mealId:1,name:'comida1',dateEaten:'2021-09-09T00:00:00.000Z',
        FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}],
        },
        onDeleteMeal:jest.fn().mockReturnValueOnce(onDeleteMealSuccess),
        onUpdateCurrentMealInState:jest.fn().mockReturnValueOnce(onUpdateCurrentMealInStateSuccess),
        preventDefault:jest.fn()
    };
   // const mealUpdate = {mealId: 1,name:'comida2',dateEaten:'2021-09-09T00:00:00.000Z',FoodList:[]};
    //const deleteaa = {mealId:21, userId:1};
    //const updateaa = {FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]};
    const preventDefault ={preventDefault: jest.fn()};
    //const mockProps2= { show:false,onHide:() => {},meal:mockProps}
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MealModal {...mockProps} history={historyMock}  />
            
        );

    })
    it('expect t3', () => {
      
     //   expect(wrapper.find('calculateTotalCaloriesPerMeal')).toBeDefined();
        wrapper.find('[type="button"]').at(0).simulate('click');
       // expect(wrapper.instance().props.onUpdateCurrentMealInState).toHaveBeenCalledTimes(1);
        //expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        //expect(historyMock.push.mock.calls[1]).toEqual(['/meals']);
    })
    it('expect t2', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('calculateTotalCaloriesPerMeal')).toBeDefined();
    })
    it('expect t22', async() => {
        await wrapper.find('[type="button"]').at(2).simulate('click', preventDefault);
       // expect(wrapper.instance().props.onUpdateCurrentMealInState()).toHaveBeenCalledTimes(1);
        //expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
    })
    it('expect to change  onclick buttons', async () => {
       
        await wrapper.find('[type="button"]').at(1).simulate('click');
       // await wrapper.find('[type="button"]').at(2).simulate('click');
       expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();
      
    })
it('deleteMeal should go', async () => {
        await wrapper.find('[type="button"]').at(3).simulate('click', preventDefault);
        //expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
        //expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
        //expect(wrapper.instance().props.onDeleteMeal).toHaveBeenCalledTimes(1);
    })
})
