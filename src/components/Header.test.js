import React from 'react';
import { shallow } from 'enzyme'; 
import Header from './Header';

describe('Header tests', () => {
    const historyMock = { push: jest.fn() };
    const mockPropsSignIn = {userId: 1, onLogout: jest.fn()};
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header {...mockPropsSignIn} history={historyMock}/>);
    })

    it('expect to render Header component to render with signing in', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('expect to logout and go to login when pressing the button', () => {
        wrapper.find('[type="button"]').at(0).simulate('click');
        expect(wrapper.instance().props.onLogout).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    })
})
