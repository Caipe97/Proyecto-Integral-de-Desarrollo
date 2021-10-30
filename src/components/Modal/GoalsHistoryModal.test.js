import React from 'react';
import { shallow } from 'enzyme'; 
import GoalsHistoryModal from './GoalsHistoryModal';
//    <GoalsHistoryModal goal={row} history={this.props.history} onDeleteGoal={this.props.onDeleteGoal} onUpdateCurrentGoalInState={this.props.onUpdateCurrentGoalInState} />
          //props.goal.objectives.map
describe('GoalsHistoryModal tests', () => {
    const historyMock = { push: jest.fn() };
    const preventDefault = { preventDefault: jest.fn() };
    const mockPropsSignIn = {
        //goal: {name:'enero',dateStart:"2021-09-30T14:09:34.756Z",totalCalories:300,objectives:[]}, 
        preventDefault:jest.fn(),
        onGetMealsFromUser:jest.fn(),
        onDeleteMeal:jest.fn(),
        onUpdateCurrentMealInState:jest.fn(),
        onLogout:jest.fn(),
        onGetMealsByPeriod: jest.fn(),
        onGetFoodCategories: jest.fn(),
        onGetLastYearsMeals: jest.fn(),
        onGetGoalsFromUser: jest.fn(),
        onDeleteGoal: jest.fn(),
        onUpdateCurrentGoalInState:jest.fn(),
    };
    let wrapper;
    

    beforeEach(() => {
        wrapper = shallow(<GoalsHistoryModal {...mockPropsSignIn} history={historyMock}/>);
     
    })

    it('expect to render GoalsHistoryModal component to render', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('expect to change  onclick buttons for show more info',  () => {
         wrapper.find('[type="button"]').at(0).simulate('click');
    })
    it('expect to change  onclick buttons for show more info for hide this',  () => {
        wrapper.find('[type="button"]').at(1).simulate('click');
   })
   
})
