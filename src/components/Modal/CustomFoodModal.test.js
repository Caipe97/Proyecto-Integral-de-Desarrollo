
import { shallow } from 'enzyme';
import CustomFoodModal from './CustomFoodModal';
import React, { Component } from 'react';
import Combobox from "react-widgets/Combobox";

describe('CustomFoodModal tests', () => {
    const historyMock = { push: jest.fn() };
    let wrapper;
    let mockProps;
    beforeEach(() => {
          mockProps = {
            edit:true,
            foodId:1,
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
        
   
        onEditCustomFood:jest.fn(),
        preventDefault:  jest.fn()
      };
        wrapper = shallow(<CustomFoodModal {...mockProps} history={historyMock}/>);
      //  wrapper2 = shallow(<CustomFoodModal {...mockProps2} history={historyMock}/>);
     })
    it('expect to render CustomFoodModal component to render with signing in sin comida', () => {
        expect(wrapper).toMatchSnapshot();
    })
 
   
})