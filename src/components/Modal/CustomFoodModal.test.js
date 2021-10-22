import React from 'react';
import { shallow } from 'enzyme';
import CustomFoodModal from './CustomFoodModal';

describe('ModalAddCategoryModal tests', () => {
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;
    let wrapper2;
    beforeEach(() => {
        let mockProps = {
            foodCategories: [
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
            onAddCustomFood: jest.fn(),
            edit: false,
            userId: 1,
        };
        let mockProps2 = {
            foodCategories: [
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
            onAddCustomFood: jest.fn(),
            edit: true,
            userId: 1,
        };
        wrapper = shallow(<CustomFoodModal {...mockProps} />

        );
        wrapper2 = shallow(<CustomFoodModal {...mockProps2} />

        );
        //wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'abc' } });
    })
    it('expect t2', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('expect t2', () => {
        expect(wrapper2).toMatchSnapshot();
    })
    it('handleChange should update the state correctly when writing on the inputs', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'Patata' } });
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'recommendedServing', value: 456 } });
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'caloriesPerServing', value: 123 } });
    })
    //else props.edit
    it('handleSubmit expect t11', () => {
        wrapper.find('[type="button"]').at(1).simulate('click', preventDefault);
    })
    it('handleSubmit expect t11', () => {
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
    })
    it('handleSubmit expect t11', () => {
        wrapper.find('[type="button"]').at(0).simulate('click', preventDefault);
    })
    it('handleSubmit expect t11', () => {
        wrapper2.find('[type="button"]').at(0).simulate('click', preventDefault);
    })
    //if props.edit
    // it('expect to change  onclick buttons', () => {
    //     wrapper2.find('img').simulate('click');
    // })
    // it('handleSubmit expect t11',async() => {
    //      await wrapper2.find('[className="button"]').at(0).simulate('click', preventDefault);
        
    // })
    it('handleSubmit expect t11', () => {
        wrapper2.find('[type="button"]').at(0).simulate('click', preventDefault);
    })
})
