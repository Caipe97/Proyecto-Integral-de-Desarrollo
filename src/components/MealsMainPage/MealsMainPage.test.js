import React from 'react';
import { shallow } from 'enzyme';
import MealsMainPage from './MealsMainPage';

describe('MealsMainPage tests', () => {
    const historyMock = { push: jest.fn(),location:{state:{meal:{name: 'comida',    
    dateEaten:'2021-09-15T19:58:04.486Z',
    successMessage:'',} }}};
    const historyMock2 = { push: jest.fn(),location:{state:{meal:{} }}};
    const historyMock3 = { push: jest.fn(),location:[]};
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper,wrapper2,wrapper3;

    beforeEach(() => {
          let mockProps = {    
              state:   {name: 'comida',    
              dateEaten:'2021-09-15T19:58:04.486Z',
              successMessage:'',}, 
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
        wrapper3 = shallow(<MealsMainPage {...mockProps} history={historyMock3}/>);
     })
    it('expect to render ProfileMainPage component to render with signing in sin comida', async() => {
        expect(wrapper).toMatchSnapshot();
        await wrapper.instance().componentDidMount();
    })

    it('expect to render ProfileMainPage component to render with signing in sin comida222',async () => {
        expect(wrapper2).toMatchSnapshot();
        await wrapper2.instance().componentDidMount();
    })
    it('expect to render ProfileMainPage component to render with without food',async () => {
        expect(wrapper3).toMatchSnapshot();
        await wrapper3.instance().componentDidMount();
    })
    it('expect to render MealsMainPage component to render with food', () => {
        wrapper.find('[alt="tacho"]').at(0).simulate('click');
        expect(wrapper.instance().props.onRemoveFoodFromCurrentMeal).toHaveBeenCalledTimes(1);
    })
   
    it('handleChange should update the state correctly when writing on the inputs', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'milanesa' } });
        expect(wrapper.instance().state.name).toEqual('milanesa');
    })


it('handleSubmitUpdate click ',async () => {
    wrapper.find('button').at(0).simulate('click', { preventDefault: jest.fn()});
    })
    it('handleSubmitCreate click ',async () => {
    wrapper.find('button').at(1).simulate('click', { preventDefault: jest.fn()});
    })

    it('expect to render ProfileMainPage component to render with onRemoveFoodFromCurrentMeal', () => {
         wrapper3.find('[alt="tacho"]').at(0).simulate('click');
         expect(wrapper3.instance().props.onRemoveFoodFromCurrentMeal).toHaveBeenCalledTimes(1);
     })

    
    it('go to profile when you click this button', () => {
        wrapper3.find('button').at(1).simulate('click',preventDefault);
       
        expect(wrapper3.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock3.push.mock.calls[0]).toEqual(['/profile']);

    })
    it('HandleSubmitUpdate expect to change  onclick buttons',  () => {
        wrapper2.find('button').at(1).simulate('click',{preventDefault:jest.fn()});

     })
 

})