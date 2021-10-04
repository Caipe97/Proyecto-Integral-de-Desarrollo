import React from 'react';
import { shallow } from 'enzyme';
import ProfileMainPage from './ProfileMainPage';

describe('ProfileMainPage tests', () => {
    const historyMock = { push: jest.fn() };
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper, wrapper2;

    beforeEach(() => {
        let mockProps2 = {
            
                userId: 1,
                    name: 'julian',
                    surname: 'livrone',
                    email: 'julianlivrone@gmail.com',
                    password: 'asd',
                    gender: 'masculino',
                    birthday: '2010-01-21',
                    weight: 90,
                    height: 170,
                    meals:[
                        {mealId: 21, name: 'queso', foodsAndQuantity: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                        {mealId: 22, name: 'carne', foodsAndQuantity: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                        {mealId: 23, name: 'jamon', foodsAndQuantity: {quantity: 1, foods: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
                    ],
                    onGetMealsFromUser:jest.fn(),
            // onResetPassword: jest.fn(),
            onLogout: jest.fn(),
            preventDefault:  jest.fn()
          };
          let mockProps = {
            
            userId: 1,
                name: 'julian',
                surname: 'livrone',
                email: 'julianlivrone@gmail.com',
                password: 'asd',
                gender: 'masculino',
                birthday: '2010-01-21',
                weight: 90,
                height: 170,
                meals:[],
                onGetMealsFromUser:jest.fn(),
        onLogout: jest.fn(),
        preventDefault:  jest.fn()
      };
        wrapper = shallow(<ProfileMainPage {...mockProps} history={historyMock}/>);
        wrapper2 = shallow(<ProfileMainPage {...mockProps2} history={historyMock}/>);
     })
    it('expect to render ProfileMainPage component to render with signing in sin comida', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('expect to render ProfileMainPage component to render with signing in con comida', () => {
        expect(wrapper2).toMatchSnapshot();
    })

    it('handleSubmit should go to meals', async () => {
        await wrapper.find('[type="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
    })
    it('handleSubmit should go to meals', async () => {
        await wrapper2.find('[type="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper2.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
    })
   
})