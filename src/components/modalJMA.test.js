import React from 'react';
import { shallow } from 'enzyme'; 
import ModalJMA from './ModalJMA';
import { MyVerticallyCenteredModal } from './ModalJMA';
import Modal from 'react-bootstrap/Modal';

describe('Header tests', () => {
    const historyMock = { push: jest.fn() };///
    const mockProps = {mealId: 1,name:'comida1',dateEaten:'12-21-32',FoodList:[]};
    const mockProps2= { show:false,onHide:jest.fn(),meal:mockProps}
    let wrapper;
    let wrapper2;
    beforeEach(() => {
      
        wrapper = shallow(<ModalJMA {...mockProps} history={historyMock}></ModalJMA>);
        wrapper2 = shallow(<MyVerticallyCenteredModal {...mockProps2}  history={historyMock}/>);
    })

    it('expect to render ModalJMA component to render with carouselContainer', () => {
        expect(wrapper).toMatchSnapshot();
        // expect(wrapper2.find(Modal)).toHaveLength(1);
        expect(wrapper.find(MyVerticallyCenteredModal)).toHaveLength(1);
        //wrapper2.find('[type="button"]').at(0).simulate('click');
        //expect(wrapper2.instance()).to.be.instanceOf(MyVerticallyCenteredModal);
    })

    it('expect to change when pressing the button in ModalJMA and MyVerticallyCenteredModal', () => {
        wrapper.find('[type="button"]').at(0).simulate('click');
        wrapper2.find('[type="button"]').at(0).simulate('click');
        
    })
    it('expect to change hide in MyVerticallyCenteredModal', () => {
       
        wrapper2.find('[type="button"]').at(0).simulate('click');
        expect(mockProps2.onHide).toBeDefined();
        expect(wrapper2.find('Modal').props().onHide).toBeDefined(); 
      
    })


   





    
})
