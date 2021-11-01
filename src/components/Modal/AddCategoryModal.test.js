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
    it('expect to render AddCategoryModal component to render', () => {
        expect(wrapper).toMatchSnapshot();
 //       expect(wrapper.find('calculateTotalCaloriesPerMeal')).toBeDefined();
    })
    it('Set modal and setstate null message expect to change  onclick buttons',  () => {
       
    wrapper.find('[type="button"]').at(0).simulate('click');
       // await wrapper.find('[type="button"]').at(2).simulate('click');
       expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();

      
    })
    it('expect to change  onclick buttons for set modal', () => {
       
        wrapper.find('img').at(0).simulate('click');
               
    })

    it('handleSubmit expect to change onclick for crear', () => {
        ///jest.useFakeTimers();

         wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);


    })


})
