import React from 'react';
import { shallow } from 'enzyme'; 
import AddCategoryModal from './AddCategoryModal';
//import Combobox from "react-widgets/Combobox";
describe('ModalAddCategoryModal tests', () => {
   // const historyMock = { push: jest.fn(), };///
    //let mockProps;
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;
    beforeEach(() => {
        let mockProps= {
            state:{
                name: '',
                errorMessage: ''
            },
            preventDefault:jest.fn(),
            onCreateCategory:jest.fn()
        };
        wrapper = shallow(<AddCategoryModal {...mockProps} />
            
        );
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'abc' } });

    })
    it('expect t2', () => {
        expect(wrapper).toMatchSnapshot();
 //       expect(wrapper.find('calculateTotalCaloriesPerMeal')).toBeDefined();
    })
    it('expect to change  onclick buttons',  () => {
       
    wrapper.find('[type="button"]').at(0).simulate('click');
       // await wrapper.find('[type="button"]').at(2).simulate('click');
       expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();

      
    })
    it('expect to change  onclick buttons', () => {
       
        wrapper.find('img').at(0).simulate('click');
           // await wrapper.find('[type="button"]').at(2).simulate('click');
               
    })
    // it('expect t10', () => {
    //        expect(wrapper.instance().props.state).toEqual({
    //         name: '',
    //         errorMessage: ''
    //     });  
    // })
    it('handleSubmit expect t11', () => {
        ///jest.useFakeTimers();

         wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
 //expect(wrapper.instance().props.onCreateCategory).toHaveBeenCalledTimes(1);
        //wrapper.find('button').at(0).simulate('click',jest.fn());
           // await wrapper.find('[type="button"]').at(2).simulate('click');
        //    expect(wrapper.instance().state).toEqual({
        //     name: 'abc',
        //     errorMessage: ''
        // });  
       // expect(setTimeout).toHaveBeenCalledTimes(1);
        // wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: '' } });
        // wrapper.find('p').at(0).simulate('change', { target: { name: 'errorMessage', value: '' } });


        // expect(wrapper.instance().state).toEqual({
        //     name: '',
        //     errorMessage: ''
        // });  

    })


})
