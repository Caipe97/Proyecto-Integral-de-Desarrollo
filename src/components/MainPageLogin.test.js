import React from 'react';
import { shallow } from 'enzyme';
import MainPageLogin from './MainPageLogin';

describe('MainPageLogin tests', () => {
    const historyMock = { push: jest.fn() };
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;
    const onLoginReturnedDataSuccess = {
        id: 1,
        name: 'julian',
        surname: 'livrone',
        email: 'julianlivrone@gmail.com',
        password: 'asd',
        gender: 'masculino',
        birthday: '2010-01-21',
        weight: 90,
        height: 170,
    };

    beforeEach(() => {
        let mockProps = {
            userDataReducer: {
                id: 0,
                name: '',
                surname: '',
                email: '',
                password: '',
                gender: '',
                birthday: '',
                weight: '',
                height: '',
                isPending: false
            },
            onLogin: jest.fn().mockReturnValueOnce(onLoginReturnedDataSuccess),
            onLogout: jest.fn(),
            preventDefault:  jest.fn()
          };
        wrapper = shallow(<MainPageLogin {...mockProps} history={historyMock}/>);
    })

    
    it('renders MainPageLogin without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    it('handleChange should update the state correctly when writing on the inputs', () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        expect(wrapper.instance().state).toEqual({email: 'julianlivrone@gmail.com', password: 'asd'});
    })

    it('handleSubmit should update the state to its initial state (empty)', async () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().state).toEqual({email: '', password: ''});
    })

    it('handleSubmit should push to profile when fetching the userData', async () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onLogin).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/profile']);
    })

    it('handleSubmit should not push to profile when not been able to fetch userData', async () => {
        let mockProps = {
            userDataReducer: {
                id: 1,
                name: 'julian',
                surname: 'livrone',
                email: 'julianlivrone@gmail.com',
                password: 'asd',
                gender: 'masculino',
                birthday: '2021-09-09',
                weight: 12,
                height: 14,
                isPending: false
            },
            // onLogin: jest.fn().mockRejectedValueOnce("ERROR: could not fetch data"),
            onLogin: jest.fn().mockResolvedValueOnce("ERROR: could not fetch data"),
            onLogout: jest.fn()
          };
        wrapper = shallow(<MainPageLogin {...mockProps} history={historyMock}/>);
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onLogin).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })
})