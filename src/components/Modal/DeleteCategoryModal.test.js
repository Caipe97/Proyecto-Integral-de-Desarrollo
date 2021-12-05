import React from 'react';
import { shallow } from 'enzyme';
import DeleteCategoryModal from './DeleteCategoryModal';

describe('ModalDeleteCategoryModal tests', () => {
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;
    beforeEach(() => {
        let mockProps = {
            state: {
                name: '',
                foodCategoryId: '',
                errorMessage: ''
            },
            foodCategories:[
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
            onDeleteCategory: jest.fn()
        };
        wrapper = shallow(<DeleteCategoryModal {...mockProps} />

        );

    })
    it('expect to render DeleteCategoryModal component to render when edit is false', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('Set modal and setstate null message expect to change  onclick buttons', () => {

        wrapper.find('[type="button"]').at(0).simulate('click');
        expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();

    })
    it('expect to change  onclick buttons for set modal', () => {

        wrapper.find('img').at(0).simulate('click');

    })
    it('handleSubmit  expect to change onclick for delete',  () => {
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);

    })

})
