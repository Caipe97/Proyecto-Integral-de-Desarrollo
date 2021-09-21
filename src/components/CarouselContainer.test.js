import React from 'react';
import { shallow } from 'enzyme'; 
import CarouselContainer from './CarouselContainer';
//<CarouselContainer meals={props.meals} history={history}/>
describe('Carousel tests', () => {
    //userId:1
    const mockPropsMeal={mealId: 1,currentMeal:'comida1', isPending:false, foods:[]}
    const historyMock = { push: jest.fn() };
    //const mockPropsMeal = {meals:meal1 };     
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CarouselContainer 
            {...mockPropsMeal} history={historyMock}/>);
    })

    it('expect to render Header component to render with meals for user', () => {
      //  expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Carousel.Item')).toBeDefined();
        //expect(wrapper.find('Dropdown').to.have.length(2));
    })
    // it('expect to render Header component to render with meals for user', () => {
    //     //expect(wrapper).toMatchSnapshot();
    //     expect(wrapper.find('.modal-footer').length).toEqual(1);  
    // })

})
