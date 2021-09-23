import React from 'react';
import { shallow } from 'enzyme'; 
import MealModal from './MealModal';
import { MyVerticallyCenteredModal } from './MealModal';
import Modal from 'react-bootstrap/Modal';

describe('Modal tests', () => {
    const historyMock = { push: jest.fn() };///
    const mockProps = {mealId: 1,name:'comida1',dateEaten:'2021-09-09T00:00:00.000Z',FoodList:[]};
    const mealUpdate = {mealId: 1,name:'comida2',dateEaten:'2021-09-09T00:00:00.000Z',FoodList:[]};
//const preventDefault =  jest.fn();
    //const mockProps2= { show:false,onHide:() => {},meal:mockProps}
    let wrapper;
    const Delete= {mealId:1, userId:1}
    //let wrapper2;
    beforeEach(() => {
        wrapper = shallow(<MealModal meal={mockProps} onUpdateCurrentMealInState={mealUpdate} onDeleteMeal={Delete} history={historyMock}/>
            
        );

    })

    it('expect t2', () => {
        expect(wrapper).toMatchSnapshot();
    
    })
    it('expect to change  onclick buttons', () => {
       
        wrapper.find('[type="button"]').at(0).simulate('click');
        wrapper.find('[type="button"]').at(1).simulate('click');
        expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();
        //wrapper.find('[type="button"]').at(3).simulate('click');
    })
//     it('expect to change update meals', async () => {
//     await wrapper.find('[type="button"]').at(2).simulate('click', preventDefault);
//    // expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(1);
//     //expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
//     expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
//     })
})
