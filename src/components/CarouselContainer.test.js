import React from 'react';
import { shallow } from 'enzyme'; 
import CarouselContainer from './CarouselContainer';
<CarouselContainer meals={props.meals} history={history}/>
describe('Header tests', () => {

    const meal1={userId: 1,currentMeal:'comida1',         isPending:false,        foods:[]}
    const historyMock = { push: jest.fn() };
    const mockPropsMeal = {meals:meal1 , preventDefault:  jest.fn()};
     
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CarouselContainer 
            {...mockPropsMeal} history={historyMock}/>);
    })

    it('expect to render Header component to render with meals for user', () => {
        expect(wrapper).toMatchSnapshot();
    })

})
