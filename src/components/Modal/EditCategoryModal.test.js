import React from 'react';
import { shallow } from 'enzyme';
import EditCategoryModal from './EditCategoryModal';

describe('ModalEditCategoryModal tests', () => {
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;
    let mockProps;
    beforeEach(() => {
        mockProps = {
            state: {
                name: '',
                foodCategoryId: '',
                errorMessage: ''
            },
            categories:[
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
            preventDefault: jest.fn(),
            onEditCategory: jest.fn()
        };
        wrapper = shallow(<EditCategoryModal {...mockProps} />

        );
     //   wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'abc' } });

    })
    it('expect t2', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('expect to change  onclick buttons', () => {

        wrapper.find('[type="button"]').at(0).simulate('click');
        expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();

    })
    it('expect to change  onclick buttons in img', () => {

        wrapper.find('img').at(0).simulate('click');

    })
    it('handleSubmit expect t11', async () => {

       // jest.useFakeTimers();
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
       // expect(wrapper.instance().props.onEditCategory).toHaveBeenCalledTimes(1);
    })
    // it('onChangeCombobox expect t12', async () => {
    //     jest.useFakeTimers();
    //    // await wrapper.find('onSelect').instance().toBeDefined();
    //     wrapper.find('foodCategoryId').at(0).simulate('change', { target: { name: 'foodCategoryId', value: 1 } });

    // })
    // it('handleChange expect to render EditCategoryModal component to location state not in button push profile', () => {
    //     //wrapper1.find('DatePicker').at(0).find('onChange').simulate('click',preventDefault);
    //     //wrapper1.find('Textfield').at(0).simulate('click');
        
    //     wrapper.find('[type="name"]').at(0).simulate('change', { target: { name: 'name', value: 'tomate' } });
    //     //expect(wrapper1.instance().handleChangeDateEaten('12-12-1212 12:12 12')).toHaveBeenCalledTimes(1);
    //     //expect( wrapper1.find('DatePicker').at(0).find('onChange')).toHaveBeenCalled();
    //  })
     it('changecombobox expect to render EditCategoryModal component to location state not in button push profile', async() => {
        //wrapper1.find('DatePicker').at(0).find('onChange').simulate('click',preventDefault);
        //wrapper1.find('Textfield').at(0).simulate('click');
        
       await  wrapper.find('Combobox').at(0).simulate('onSelect', { target: { name: 'name', value: 'tomate' } });
        //expect(wrapper1.instance().handleChangeDateEaten('12-12-1212 12:12 12')).toHaveBeenCalledTimes(1);
        //expect( wrapper1.find('DatePicker').at(0).find('onChange')).toHaveBeenCalled();
     })

})
