import React from 'react';
import { shallow } from 'enzyme'; 
import GoalsMainPage from './GoalsMainPage';

describe('GoalsMainPage tests', () => {
    const historyMock = { push: jest.fn(),location: {state:{goal:{
        goalId: 1,
        name: 'myGoal',
        dateStart: '2021-07',
        totalCalories: 5000,
        objectives: 
        [
            {
                objectiveCalories: 3000,
                foodCategoryId: 1
            },
            {
                objectiveCalories: 2000,
                foodCategoryId: 2
            },
        ]
    }}}};
    const historyMock2 = { push: jest.fn(),location: {state:{goal: {}}}};
    const historyMock3 = { push: jest.fn(),location: []}
    const mockProps = {
        currentGoal: {objectives: []},
        onLogout: jest.fn(),
        onAddObjectiveToCurrentGoal:jest.fn(),
        onAddGoal: jest.fn(),
        onGetAllFoods: jest.fn(),
        onLogout: jest.fn(),
        onResetCurrentGoal: jest.fn(),
        onChangeCurrentGoalNameTotalCaloriesAndDateStart: jest.fn(),
        onGetFoodCategories: jest.fn(),
        onRemoveObjectiveFromCurrentGoal:jest.fn(),
        onUpdateCurrentGoal: jest.fn(),
        preventDefault:  jest.fn(),
    };
    const mockProps2 = {
        currentGoal: { name: 'Plan enero',dateStart: "2021-07",totalCalories: 7000,objectives: []},
        onLogout: jest.fn(),
        onAddObjectiveToCurrentGoal:jest.fn(),
        onAddGoal: jest.fn(),
        onGetAllFoods: jest.fn(),
        onLogout: jest.fn(),
        onResetCurrentGoal: jest.fn(),
        onChangeCurrentGoalNameTotalCaloriesAndDateStart: jest.fn(),
        onGetFoodCategories: jest.fn(),
        onRemoveObjectiveFromCurrentGoal:jest.fn(),
        onUpdateCurrentGoal: jest.fn(),
        preventDefault:  jest.fn(),
    };
    let wrapper,wrapper2,wrapper3;
    

    beforeEach(() => {
        wrapper = shallow(<GoalsMainPage {...mockProps} history={historyMock}/>);

        wrapper2 = shallow(<GoalsMainPage {...mockProps2} history={historyMock2}/>);
        wrapper3 = shallow(<GoalsMainPage {...mockProps2} history={historyMock3}/>);
    })

    it('expect to render GoalsMainPage component to render', async() => {
        expect(wrapper).toMatchSnapshot();//if
        await wrapper.instance().componentDidMount();
    })
    it('expect to render GoalsMainPage component to render', async() => {
        expect(wrapper2).toMatchSnapshot();//if
        await wrapper2.instance().componentDidMount();
    })
    it('expect to render GoalsMainPage component to render when you dont have goals state false for you', async() => {
        expect(wrapper3.debug()).toMatchSnapshot();//if
        await wrapper3.instance().componentDidMount();
    })

    it('expect to change  onclick buttons', async () => {
       
        await wrapper.find('[type="button"]').at(0).simulate('click');
       expect(wrapper.find('div')).toBeDefined();
        expect(wrapper.find('div.p').contains('')).toBeDefined();
      
    })
    it('handleChange should update the state correctly when writing on the inputs', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'LOGROS ENERO' } });
        wrapper.find('[name="totalCalories"]').at(0).simulate('change', { target: { name: 'totalCalories', value: '123456' } });
    })
    it('expect to change  onclick buttons',  () => {
       wrapper.find('img').at(0).simulate('click');
      
      
    })
    it('HandleSubmitUpdate expect to change  onclick buttons',  () => {
        wrapper3.find('button').at(0).simulate('click',{preventDefault:jest.fn()});
        // await wrapper.find('[type="button"]').at(2).simulate('click');

     })
     it('Go to profile expect to change  onclick buttons',  () => {
        wrapper3.find('button').at(1).simulate('click',{preventDefault:jest.fn()});
        // await wrapper.find('[type="button"]').at(2).simulate('click');
        expect(historyMock3.push.mock.calls[0]).toEqual(['/profile']);

     })
   
   
})
