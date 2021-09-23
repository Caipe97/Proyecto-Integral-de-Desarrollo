import React from 'react';
import { shallow } from 'enzyme'; 
import CarouselContainer from './CarouselContainer';
//<CarouselContainer meals={props.meals} history={history}/>
describe('Carousel tests', () => {
    //userId:1
    const mockPropsMeal=
    [{
        mealId: 21,
        name: "queso",
        foodsAndQuantity: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}},
        dateEaten: "2021-09-09T00:00:00.000Z",
        userId: 1
    }];
    const historyMock = { push: jest.fn() };
    //const mockPropsMeal = {meals:meal1 };     
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CarouselContainer meals={mockPropsMeal} history={historyMock}/>);
    })

    it('expect to render carousel', () => {
        expect(wrapper).toMatchSnapshot();
        //   expect((wrapper.props.meals).map(obj => obj.mealId)).toEqual(
        //     mockPropsMeal.map(obj => obj.mealId)
        //   );
        expect(wrapper.find('Carousel.Item')).toBeDefined();
        expect(wrapper.find('.Carousel.Item.div.div.div.p').contains('Milanesa')).toBeDefined();
        //expect(wrapper2.find('Carousel.Item').contains('comida1')).toBeDefined(); 
        //expect(wrapper.find('Dropdown').to.have.length(2));
    })
    // it('expect to render Header component to render with meals for user', () => {
    //     //expect(wrapper).toMatchSnapshot();
    //     expect(wrapper.find('.modal-footer').length).toEqual(1);  
    // })

})
