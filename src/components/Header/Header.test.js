import React from 'react';
import { shallow } from 'enzyme'; 
import Header from './Header';

describe('Header tests', () => {
    const historyMock = { push: jest.fn() };
    const mockPropsSignIn = {userId: 1, onLogout: jest.fn()};
    let wrapper;
    const mockPropsSignIn2 = {userId: 0, onLogout: jest.fn()};
    let wrapper2;

    beforeEach(() => {
        wrapper = shallow(<Header {...mockPropsSignIn} history={historyMock}/>);
        wrapper2 = shallow(<Header {...mockPropsSignIn2} history={historyMock}/>);
    
    })

    it('expect to render Header component to render with signing in', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('expect to logout and go to login when pressing the button', () => {
        wrapper.find('[name="link"]').at(0).simulate('click');
        expect(wrapper.instance().props.onLogout).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    })
    it('expect to render Header component to user not defined', () => {
        expect(wrapper2).toMatchSnapshot();
    })
    it('expect to logout and go to login  not exists button', () => {
        //expert(wrapper2.find('.img')).toEqual(null);
        //expect(wrapper2.instance().props.userId).toEqual(0);
        expect(wrapper2).toMatchSnapshot();
      //  expect(wrapper.instance().props.onLogout).toHaveBeenCalledTimes(1);
       // expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        //expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    })
})
