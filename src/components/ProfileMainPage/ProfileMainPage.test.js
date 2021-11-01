import React from 'react';
import { shallow } from 'enzyme';
import ProfileMainPage from './ProfileMainPage';

describe('ProfileMainPage tests', () => {
    const historyMock = { push: jest.fn() ,location: {state:{
        dateStart: '2021-11-01T20:09:17.409Z',
        dateEnd: '2021-11-01T20:09:17.409Z',
        foodCategoriesWithCalories: [],
        filteredFoodCategories: [],
        checkboxsList: [],
        chartData: {},
        mealsQuantity: 0,
        errorMessage: ''
    }}};
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
                foodCategories: [],
                onGetMealsFromUser:jest.fn(),
                onGetMealsByPeriod: jest.fn(),
                onGetFoodCategories: jest.fn(),
                onGetLastYearsMeals: jest.fn(),
                onLogout: jest.fn(),
                preventDefault:  jest.fn(),
                onGetGoalsFromUser:jest.fn(),
                preventDefault:jest.fn()
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
            foodCategories: [],
            onGetMealsFromUser:jest.fn(),
            onGetMealsByPeriod: jest.fn(),
            onGetFoodCategories: jest.fn(),
            onGetLastYearsMeals: jest.fn(),
            onLogout: jest.fn(),
            preventDefault:  jest.fn(),
            onGetGoalsFromUser:jest.fn(),
            preventDefault:jest.fn()
      };
        wrapper = shallow(<ProfileMainPage {...mockProps} history={historyMock}/>);
        wrapper2 = shallow(<ProfileMainPage {...mockProps2} history={historyMock}/>);
     })
    it('expect to render ProfileMainPage component to render with signing in sin comida',async () => {
        expect(wrapper.debug()).toMatchSnapshot();
        await wrapper.instance().componentDidMount();
        await wrapper.instance().componentDidUpdate();
    })

    it('expect to render ProfileMainPage component to render with signing in con comida', async() => {
        expect(wrapper2.debug()).toMatchSnapshot();
        await wrapper2.instance().componentDidMount();
        await wrapper2.instance().componentDidUpdate();
    })

    it('handleSubmit expect onclick', async () => {
       wrapper.find('[className="button"]').at(0).simulate('click',{ preventDefault: jest.fn()});
    })
    
   
})