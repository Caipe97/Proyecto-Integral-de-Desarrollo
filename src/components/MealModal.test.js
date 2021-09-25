import React from 'react';
import { shallow } from 'enzyme'; 
import MealModal from './MealModal';
import { MyVerticallyCenteredModal } from './MealModal';
import Modal from 'react-bootstrap/Modal';

describe('Modal tests', () => {
    const historyMock = { push: jest.fn() };///
    const mockProps = {mealId: 1,name:'comida1',dateEaten:'2021-09-09T00:00:00.000Z',FoodList:[]};
    const mealUpdate = {mealId: 1,name:'comida2',dateEaten:'2021-09-09T00:00:00.000Z',FoodList:[]};
    const deleteaa = {mealId:21, userId:1};
    const updateaa = {FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]};
    
//const preventDefault =  jest.fn();
    //const mockProps2= { show:false,onHide:() => {},meal:mockProps}
    let wrapper;
    const Delete= {mealId:1, userId:1}
    //let wrapper2;
    beforeEach(() => {
        wrapper = shallow(<MealModal meal={mockProps} history={historyMock} onUpdateCurrentMealInState={updateaa} onDeleteMeal={deleteaa} />
            
        );

    })

    it('expect t2', () => {
        expect(wrapper).toMatchSnapshot();
    
    })
    it('expect to change  onclick buttons', () => {
       
        wrapper.find('[type="button"]').at(0).simulate('click');
        wrapper.find('[type="button"]').at(1).simulate('click');
        //expect(wrapper.instance().props.onUpdateCurrentMealInState(updateaa)).toHaveBeenCalled();
        expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();
        //wrapper.find('[type="button"]').at(3).simulate('click');
    })
//      it('expect to change update meals', () => {
//     //     
//     //     console.log('acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+wrapper.find('[type="button"]').at(1).contains);
//     //    // expect(wrapper.instance().props.onUpdateCurrentMealInState(updateaa)).toHaveBeenCalledTimes(1);
//     //     expect(wrapper.find('[type="button"]').at(1).props.history.push('/meals',{meal:updateaa})).toHaveBeenCalledTimes(1);
//     //     expect(historyMock.push.mock.calls).toEqual(['/meals',{meal:updateaa}]);
// //     await wrapper.find('[type="button"]').at(2).simulate('click', preventDefault);
// //    // expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(1);
// //     //expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
// //     expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
//     })
})
