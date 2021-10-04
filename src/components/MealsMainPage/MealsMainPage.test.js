
import { shallow } from 'enzyme';
import MealsMainPage from './MealsMainPage';
import React, { Component } from 'react';


describe('MealsMainPage tests', () => {
    const historyMock1 = { push: jest.fn(),location:{state:true} };//if
    const historyMock2 = { push: jest.fn(),location:{state:false} };//else
    
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper1,wrapper2;
    let mockProps;
    beforeEach(() => {
          mockProps = {
            state : {
              name: 'Comida',
              dateEaten: '',
              successMessage: ''
            },
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
        
        onAddMeal: jest.fn(),
        onGetMealsFromUser:jest.fn(),
        onDeleteMeal: jest.fn(),
        onGetAllFoods:jest.fn(),
        onAddFoodToCurrentMeal: jest.fn(),
        onRemoveFoodFromCurrentMeal:jest.fn(),
        onLogout: jest.fn(),
        onResetCurrentMeal: jest.fn(),
        onUpdateCurrentMeal:jest.fn(),
        onChangeCurrentMealNameAndDateEaten:jest.fn(),    
        onAddCustomFood:jest.fn(), 
        onEditCustomFood:jest.fn(),
        onDeleteCustomFood:jest.fn(),
        onGetFoodCategories: jest.fn(),
        onCreateCategory: jest.fn(),
        onDeleteCategory: jest.fn(),
        onEditCategory: jest.fn(),
        preventDefault:  jest.fn()
      };
        wrapper1 = shallow(<MealsMainPage {...mockProps} history={historyMock1}/>);//if
        
        wrapper2 = shallow(<MealsMainPage {...mockProps} history={historyMock2}/>);//else
      //  wrapper2 = shallow(<MealsMainPage {...mockProps2} history={historyMock}/>);
     })
    it('expect to render MealsMainPage component to location state ', () => {
        expect(wrapper1).toMatchSnapshot();//if
    })
    it('expect to render MealsMainPage component to location state not ', () => {
      expect(wrapper2).toMatchSnapshot();//else
  })
  it('expect to render MealsMainPage component to location state not in button push profile',() => {
    //xpect(wrapper2).toMatchSnapshot();//else
    wrapper2.find('[type="button"]').at(0).simulate('click');
    expect(wrapper2.instance().props.history.push).toHaveBeenCalledTimes(1);
    expect(historyMock2.push.mock.calls[0]).toEqual(['/profile']);

  })
  it('handleSubmitUpdate expect to render MealsMainPage component to location state not in button push profile', () => {
  wrapper1.find('button').at(0).simulate('click',preventDefault);

  expect(wrapper1.instance().props.onChangeCurrentMealNameAndDateEaten).toHaveBeenCalledTimes(1);
  
  expect(wrapper1.instance().props.onUpdateCurrentMeal).toHaveBeenCalledTimes(1);
  })
  it('handleChangeDateEaten expect to render MealsMainPage component to location state not in button push profile', () => {
    // wrapper1.find('DatePicker').at(0).simulate('click',preventDefault);
   // wrapper1.find('DatePicker').at(0).prop('onChange').simulate('click',preventDefault);
    // expect(wrapper1.instance().props.onChangeCurrentMealNameAndDateEaten).toHaveBeenCalledTimes(1);
    
    // expect(wrapper1.instance().props.onUpdateCurrentMeal).toHaveBeenCalledTimes(1);
    })
  it('RemoveFoodFromCurrentMeal expect to render MealsMainPage component to location state not in button push profile', () => {
      wrapper1.find('[alt="tacho"]').at(0).simulate('click',preventDefault);
      
  expect(wrapper1.instance().props.onRemoveFoodFromCurrentMeal).toHaveBeenCalledTimes(1);
  wrapper2.find('[alt="tacho"]').at(0).simulate('click',preventDefault);
      
  expect(wrapper2.instance().props.onRemoveFoodFromCurrentMeal).toHaveBeenCalledTimes(2);
  })
  it('handleChange expect to render MealsMainPage component to location state not in button push profile', () => {
    //wrapper1.find('DatePicker').at(0).find('onChange').simulate('click',preventDefault);
    //wrapper1.find('Textfield').at(0).simulate('click');
    
    wrapper1.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'tomate' } });
    //expect(wrapper1.instance().handleChangeDateEaten('12-12-1212 12:12 12')).toHaveBeenCalledTimes(1);
    //expect( wrapper1.find('DatePicker').at(0).find('onChange')).toHaveBeenCalled();
 })
 it('handleSubmitUpdate  expect to render MealsMainPage component to location state not in button push profile', () => {
  //wrapper1.find('DatePicker').at(0).find('onChange').simulate('click',preventDefault);
  //wrapper1.find('Textfield').at(0).simulate('click');
  
  // wrapper1.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'tomate' } });
  wrapper1.find('[className="btn btn--primary btn--s"]').at(0).simulate('click',preventDefault);
  //expect(wrapper1.instance().handleChangeDateEaten('12-12-1212 12:12 12')).toHaveBeenCalledTimes(1);
  //expect( wrapper1.find('DatePicker').at(0).find('onChange')).toHaveBeenCalled();
})
it('expect to render MealsMainPage component to location state in button push profile', () => {
  //xpect(wrapper2).toMatchSnapshot();//else
  wrapper1.find('[type="button"]').at(0).simulate('click');
  expect(wrapper1.instance().props.history.push).toHaveBeenCalledTimes(1);
  expect(historyMock1.push.mock.calls[0]).toEqual(['/profile']);

})
it('handleSubmitCreate  expect to render MealsMainPage component to location state not in button push profile',() => {
  //wrapper1.find('DatePicker').at(0).find('onChange').simulate('click',preventDefault);
  //wrapper1.find('Textfield').at(0).simulate('click');
  //jest.useFakeTimers();
  // wrapper1.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'tomate' } });
   wrapper2.find('[className="btn btn--primary btn--s"]').at(0).simulate('click',preventDefault);
  expect(wrapper2.instance().props.onChangeCurrentMealNameAndDateEaten).toHaveBeenCalledTimes(1);
  expect(wrapper2.instance().props.onAddMeal).toHaveBeenCalledTimes(1);
  expect(wrapper2.instance().props.onResetCurrentMeal).toHaveBeenCalledTimes(1);
  //expect(wrapper1.instance().handleChangeDateEaten('12-12-1212 12:12 12')).toHaveBeenCalledTimes(1);
  //expect( wrapper1.find('DatePicker').at(0).find('onChange')).toHaveBeenCalled();
  
  // wrapper2.instance().state.successMessage.simulate('change', { target: { name: 'successMessage', value: 'Contraseña cambiada con exito, sera redirigido a Login en 5 segundos.' } });
  // expect(wrapper2.instance().state).toEqual({
  //   name: 'Comida',
  //   dateEaten: '',
  //   successMessage: 'Contraseña cambiada con exito, sera redirigido a Login en 5 segundos.'
  // });
})
// it('DatePicker expect to render MealsMainPage component to location state in button push profile', () => {
//   //xpect(wrapper2).toMatchSnapshot();//else
//   expect(wrapper1.find('DatePicker')).toBeDefined();
//  // wrapper1.find('DatePicker').simulate('click');
//   //.simulate('DatePicker', { target: {  value: '122143423253252' } });
//   // expect(wrapper1.instance().props.history.push).toHaveBeenCalledTimes(1);
//   // expect(historyMock1.push.mock.calls[0]).toEqual(['/profile']);

// })
})