import React from 'react';
import { shallow } from 'enzyme'; 
import GoalModal from './GoalModal';
//    <GoalModal goal={row} history={this.props.history} onDeleteGoal={this.props.onDeleteGoal} onUpdateCurrentGoalInState={this.props.onUpdateCurrentGoalInState} />
          //props.goal.objectives.map
describe('GoalModal tests', () => {
    const historyMock = { push: jest.fn() };
    const preventDefault = { preventDefault: jest.fn() };
    const mockPropsSignIn = {
        goal: {name:'enero',dateStart:"2021-09-30T14:09:34.756Z",totalCalories:300,objectives:[]}, 
        onDeleteGoal: jest.fn(),
        onUpdateCurrentGoalInState:jest.fn(),
        preventDefault:jest.fn()
    };
    let wrapper;
    

    beforeEach(() => {
        wrapper = shallow(<GoalModal {...mockPropsSignIn} history={historyMock}/>);
     
    })

    it('expect to render GoalModal component to render', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('expect to change  onclick buttons for show more info',  () => {
         wrapper.find('[type="button"]').at(0).simulate('click');
    })
    it('expect to change  onclick buttons for show more info for hide this',  () => {
        wrapper.find('[type="button"]').at(1).simulate('click');
   })
   it('expect to change  onclick buttons for delete goal',  () => {
    wrapper.find('[type="button"]').at(2).simulate('click',preventDefault);
    //expect(wrapper.instance().props.onDeleteGoal).toHaveBeenCalledTimes(1);
})
})
