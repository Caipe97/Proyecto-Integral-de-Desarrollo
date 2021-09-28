import React from 'react';
import { shallow } from 'enzyme'; 
import CarouselContainer from './CarouselContainer';

describe('Header tests', () => {
    const historyMock = { push: jest.fn() };
    const deleteaa = {mealId:21, userId:1};
    const updateaa = {FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}]};
    const mockPropsSignIn = {meals:  [
        {mealId: 21, name: 'queso', FoodList: [{quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}], dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
        {mealId: 22, name: 'carne', FoodList: [{quantity: 2, food: {foodId: 2, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}], dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
    ]};
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CarouselContainer {...mockPropsSignIn} history={historyMock} onDeleteMeal={deleteaa} onUpdateCurrentMealInState={updateaa}/>);
    })

    it('expect to render CarouselContainer component', () => {
        expect(wrapper).toMatchSnapshot();
    })

    // it('expect to logout and go to login when pressing the button', () => {
    //     wrapper.find('[name="link"]').at(0).simulate('click');
    //     expect(wrapper.instance().props.onLogout).toHaveBeenCalledTimes(1);
    //     expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
    //     expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    // })
})
