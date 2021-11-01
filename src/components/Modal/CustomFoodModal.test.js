import React from 'react';
import { shallow } from 'enzyme';
import CustomFoodModal from './CustomFoodModal';

describe('CustomFoodModal tests', () => {
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
            onEditCustomFood:jest.fn(),
            edit: false,
            userId: 1,
        };
        let mockProps2 = {
            row:{
                name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, foodCategoryId:1
            },
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
            onEditCustomFood:jest.fn(),
            edit: true,
            userId: 1,
        };
        wrapper = shallow(<CustomFoodModal {...mockProps} />

        );
        wrapper2 = shallow(<CustomFoodModal {...mockProps2} />

        );
    })
    it('expect to render AddCategoryModal component to render when edit is false', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('expect to render AddCategoryModal component to render when edit is true', () => {
        expect(wrapper2).toMatchSnapshot();
    })
    it('handleChange should update the state correctly when writing on the inputs', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'Patata' } });
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'recommendedServing', value: 456 } });
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'caloriesPerServing', value: 123 } });
    })
    //else props.edit
    it('On click if edit false, setModal for agregaralimentopersonalizado', () => {
        wrapper.find('[type="button"]').at(1).simulate('click', preventDefault);
    })
    it('HandleSubmitAdd on click ', () => {
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
    })
    it('On click if edit false, setModal for agregaralimentopersonalizado', () => {
        wrapper.find('[type="button"]').at(0).simulate('click', preventDefault);
    })
    it('handleSubmit expect t11', () => {
        wrapper2.find('[type="button"]').at(0).simulate('click', preventDefault);
    })
    it('handleSubmitEdit when edition finish ', async () => {
        wrapper2.find('button').at(0).simulate('click', preventDefault);
      
    })
    //if props.edit
    it('expect on click when change name,recommendedServing, caloriesPerServing and foodCategoryId',() => {
        wrapper2.find('[alt="editar"]').simulate('click');
    })
    it('HandleSubmitEdit on click', () => {
        wrapper2.find('[type="button"]').at(0).simulate('click', preventDefault);
    })
})
