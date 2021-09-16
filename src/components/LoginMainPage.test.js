import React from 'react';
import { shallow } from 'enzyme';
import LoginMainPage from './LoginMainPage';
import { LOGIN_OR_REGISTER_SUCCESS, LOGIN_OR_REGISTER_FAILED } from '../store/userData/userDataConstants';

describe('LoginMainPage tests', () => {
    const historyMock = { push: jest.fn() };
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;
    const onLoginReturnedDataSuccess = { 
        type: LOGIN_OR_REGISTER_SUCCESS,
        payload: {
            userId: 1,
            name: 'julian',
            surname: 'livrone',
            email: 'julianlivrone@gmail.com',
            password: 'asd',
            gender: 'masculino',
            birthday: '2010-01-21',
            weight: 90,
            height: 170
        }
    };

    beforeEach(() => {
        let mockProps = {
            userDataReducer: {
                userId: 0,
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
        wrapper = shallow(<LoginMainPage {...mockProps} history={historyMock}/>);
    })

    
    it('renders LoginMainPage without crashing', () => {
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

    it('handleSubmit should push to profile when fetching the userData when email and password are correct', async () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onLogin).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/profile']);
    })

    it('handleSubmit should not push to profile because email is not valuserId 1', async () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onLogin).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because email is not valuserId 2', async () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@dsa' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onLogin).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because password is not valuserId 1', async () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: '' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onLogin).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile when cannot fetch userData because email or password are incorrect', async () => {
        const onLoginReturnedDataFailed = { 
            type: LOGIN_OR_REGISTER_FAILED,
            payload: {
                message: 'No user found with given credentials'
            }
        };
        let mockProps = {
            userDataReducer: {
                userId: 0,
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
            // onLogin: jest.fn().mockRejectedValueOnce("ERROR: could not fetch data"),
            onLogin: jest.fn().mockResolvedValueOnce(onLoginReturnedDataFailed),
            onLogout: jest.fn()
          };
        wrapper = shallow(<LoginMainPage {...mockProps} history={historyMock}/>);
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'as' } });
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onLogin).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })
})