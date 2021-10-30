import React from 'react';
import { shallow } from 'enzyme';
import MealsMainPage from './MealsMainPage';

describe('ResetPasswordMainPage tests', () => {
    const historyMock = { push: jest.fn(),location:{state:{meal:{name: 'comida',    
    dateEaten:'2021-09-15T19:58:04.486Z',
    successMessage:'',} }}};
    const historyMock2 = { push: jest.fn(),location:{state:{meal:{} }}};
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper,wrapper2;

    beforeEach(() => {
          let mockProps = {    
                  
            userId: 1,
            meals:[
                {mealId: 21, name: 'queso', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 22, name: 'carne', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
                {mealId: 23, name: 'jamon', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
            ],
            currentMeal: {
                FoodList:[
                    {quantity: 1, food: {foodId: 1, name: 'Milanesa', 
                    recommendedServing: 85, caloriesPerServing: 198, 
                    createdAt: '2021-09-15T19:58:04.486Z'}}, 
          
                ]
            },
           
            foods: [
                {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'},
                {foodId: 2, name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, createdAt: '2021-09-15T20:02:16.490Z'}
            ],
        
        
       
        preventDefault:  jest.fn(),
        onAddMeal: jest.fn(),
    onGetMealsFromUser: jest.fn(),
    onDeleteMeal: jest.fn(),
    onGetAllFoods: jest.fn(),
    onAddFoodToCurrentMeal: jest.fn(),
    onRemoveFoodFromCurrentMeal: jest.fn(),
    onLogout:  jest.fn(),
    onResetCurrentMeal: jest.fn(),
    onUpdateCurrentMeal: jest.fn(),
    onChangeCurrentMealNameAndDateEaten: jest.fn(),
    onAddCustomFood:jest.fn(),
    onEditCustomFood: jest.fn(),
    onDeleteCustomFood: jest.fn(),
      };
        wrapper = shallow(<MealsMainPage {...mockProps} history={historyMock}/>);
        wrapper2 = shallow(<MealsMainPage {...mockProps} history={historyMock2}/>);
     })
    it('expect to render ProfileMainPage component to render with signing in sin comida', async() => {
        expect(wrapper).toMatchSnapshot();
        await wrapper.instance().componentDidMount();
    })

    it('expect to render ProfileMainPage component to render with signing in sin comida222',async () => {
        expect(wrapper2).toMatchSnapshot();
        await wrapper2.instance().componentDidMount();
    })
    it('expect to render ProfileMainPage component to render with signin con comida', () => {
       /// expect(wrapper2).toMatchSnapshot();
        wrapper.find('[alt="tacho"]').at(0).simulate('click');
        expect(wrapper.instance().props.onRemoveFoodFromCurrentMeal).toHaveBeenCalledTimes(1);
        //expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
    })
    // it('expect to change handlechange name', () => {
    //     let mockProps3 = {    
                  
    //         userId: 1,
    //         meals:[
    //             {mealId: 21, name: 'queso', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
    //             {mealId: 22, name: 'carne', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1},
    //             {mealId: 23, name: 'jamon', foodsAndQuantity: {quantity: 1, food: {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'}}, dateEaten: '2021-09-09T00:00:00.000Z', userId: 1}
    //         ],
    //         currentMeal: {
    //             FoodList:[
    //                 {quantity: 1, food: {foodId: 1, name: 'Milanesa', 
    //                 recommendedServing: 85, caloriesPerServing: 198, 
    //                 createdAt: '2021-09-15T19:58:04.486Z'}}, 
          
    //             ]
    //         },
           
    //         foods: [
    //             {foodId: 1, name: 'Milanesa', recommendedServing: 85, caloriesPerServing: 198, createdAt: '2021-09-15T19:58:04.486Z'},
    //             {foodId: 2, name: 'Papa', recommendedServing: 200, caloriesPerServing: 100, createdAt: '2021-09-15T20:02:16.490Z'}
    //         ],
        
        
       
    //     preventDefault:  jest.fn(),
    //     onAddMeal: jest.fn(),
    // onGetMealsFromUser: jest.fn(),
    // onDeleteMeal: jest.fn(),
    // onGetAllFoods: jest.fn(),
    // onAddFoodToCurrentMeal: jest.fn(),
    // onRemoveFoodFromCurrentMeal: jest.fn(),
    // onLogout:  jest.fn(),
    // onResetCurrentMeal: jest.fn(),
    // onUpdateCurrentMeal: jest.fn(),
    // onChangeCurrentMealNameAndDateEaten: jest.fn(),
    // onAddCustomFood:jest.fn(),
    // onEditCustomFood: jest.fn(),
    // onDeleteCustomFood: jest.fn(),
    //   };
    //     const wrapper3 = shallow(<MealsMainPage {...mockProps3} history={historyMock}/>);
    //     /// expect(wrapper2).toMatchSnapshot();
    //      //wrapper.find('[alt="tacho"]').at(0).simulate('click');
    //      const textfield = wrapper3.find('TextField');
    //      console.log(textfield);
    //      textfield.simulate("change", { target: { value: 'milanga'} });  // 'value' instead of 'num'
    //      expect(wrapper3.state().name).toEqual('milanga');  // SUCCESS
    //      //expect(wrapper.instance().props.onRemoveFoodFromCurrentMeal).toHaveBeenCalledTimes(1);
    //      //expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
    //  })


    // it('handleSubmit should go to meals', async () => {
    //     await wrapper.find('[type="button"]').at(0).simulate('click', preventDefault);
    //     expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
    //     expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
    // })
    // it('handleSubmit should go to meals', async () => {
    //     await wrapper2.find('[type="button"]').at(0).simulate('click', preventDefault);
    //     expect(wrapper2.instance().props.history.push).toHaveBeenCalledTimes(1);
    //     expect(historyMock.push.mock.calls[0]).toEqual(['/meals']);
    // })
    it('handleChange should update the state correctly when writing on the inputs', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'milanesa' } });
        //wrapper.find('[name="dateEaten"]').at(0).simulate('change', { target: { name: 'dateEaten', value: '2021-09-15T19:58:04.486Z' } });
        //wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        expect(wrapper.instance().state.name).toEqual('milanesa');
    })
})