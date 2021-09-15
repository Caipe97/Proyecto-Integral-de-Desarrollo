import React from 'react';
import { shallow } from 'enzyme';
import RegisterMainPage from './RegisterMainPage';
import { LOGIN_OR_REGISTER_SUCCESS } from '../store/userData/userDataConstants';

describe('RegisterMainPage tests', () => {
    const historyMock = { push: jest.fn() };
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;
    const onRegisterReturnedDataSuccess = { 
        type: LOGIN_OR_REGISTER_SUCCESS,
        payload: {
            id: 1,
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
            onRegister: jest.fn().mockReturnValueOnce(onRegisterReturnedDataSuccess),
            onLogout: jest.fn(),
            preventDefault:  jest.fn()
          };
        wrapper = shallow(<RegisterMainPage {...mockProps} history={historyMock}/>);
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'julian' } });
        wrapper.find('[name="surname"]').at(0).simulate('change', { target: { name: 'surname', value: 'livrone' } });
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        wrapper.find('[name="gender"]').at(0).simulate('change', { target: { name: 'gender', value: 'M' } });
        wrapper.find('[name="date"]').at(0).simulate('change', 'Sat Sep 18 2021 11:00:00 GMT-0300 (hora estándar de Argentina)');
        wrapper.find('[name="weight"]').at(0).simulate('change', { target: { name: 'weight', value: '90' } });
        wrapper.find('[name="height"]').at(0).simulate('change', { target: { name: 'height', value: '170' } });
    })

    
    it('renders RegisterMainPage without crashing', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: '' } });
        wrapper.find('[name="surname"]').at(0).simulate('change', { target: { name: 'surname', value: '' } });
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: '' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: '' } });
        wrapper.find('[name="gender"]').at(0).simulate('change', { target: { name: 'gender', value: '' } });
        wrapper.find('[name="date"]').at(0).simulate('change', '');
        wrapper.find('[name="weight"]').at(0).simulate('change', { target: { name: 'weight', value: '' } });
        wrapper.find('[name="height"]').at(0).simulate('change', { target: { name: 'height', value: '' } });
        expect(wrapper).toMatchSnapshot();
    })
    
    it('handleChange should update the state correctly when completing the inputs', () => {
        expect(wrapper.instance().state).toEqual({
            name: 'julian',
            surname: 'livrone',
            email: 'julianlivrone@gmail.com',
            password: 'asd',
            gender: 'M',
            birthday: 'Sat Sep 18 2021 11:00:00 GMT-0300 (hora estándar de Argentina)',
            weight: '90',
            height: '170'
        });
    })

    it('handleSubmit should update the state to its initial state (empty)', async () => {
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().state).toEqual({
            name: '',
            surname: '',
            email: '',
            password: '',
            gender: '',
            birthday: '',
            weight: '',
            height: ''
        });
    })

    it('handleSubmit should push to profile when fetching the userData when all inputs are valid', async () => {
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/profile']);
    })

    it('handleSubmit should not push to profile because name is empty', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: '' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because name contains numbers', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'julian123' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because name contains special characters', () => {
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'julian@#$' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because surname contains numbers', () => {
        wrapper.find('[name="surname"]').at(0).simulate('change', { target: { name: 'surname', value: 'livrone123' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because surname contains special characters', () => {
        wrapper.find('[name="surname"]').at(0).simulate('change', { target: { name: 'surname', value: 'livrone@#$' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because email is not valid 1', () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: '' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because email is not valid 2', () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because email is not valid 3', () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because email is not valid 4', () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because email is not valid 5', () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because email is not valid 5', () => {
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because password is empty', () => {
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: '' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because gender is empty', () => {
        wrapper.find('[name="gender"]').at(0).simulate('change', { target: { name: 'gender', value: '' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because weight is empty', () => {
        wrapper.find('[name="weight"]').at(0).simulate('change', { target: { name: 'weight', value: '' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because weight contains letters', () => {
        wrapper.find('[name="weight"]').at(0).simulate('change', { target: { name: 'weight', value: '123abc' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because weight contains special characters', () => {
        wrapper.find('[name="weight"]').at(0).simulate('change', { target: { name: 'weight', value: '123@#$' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because height contains letters', () => {
        wrapper.find('[name="height"]').at(0).simulate('change', { target: { name: 'height', value: '123abc' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile because height contains special characters', () => {
        wrapper.find('[name="height"]').at(0).simulate('change', { target: { name: 'height', value: '123@#$' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })

    it('handleSubmit should not push to profile when cannot fetch userData because email is already in use', () => {
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
            // onRegister: jest.fn().mockRejectedValueOnce("ERROR: the email is already in use"),
            onRegister: jest.fn().mockResolvedValueOnce("ERROR: the email is already in use"),
            onLogout: jest.fn()
          };
        wrapper = shallow(<RegisterMainPage {...mockProps} history={historyMock}/>);
        wrapper.find('[name="name"]').at(0).simulate('change', { target: { name: 'name', value: 'julian' } });
        wrapper.find('[name="surname"]').at(0).simulate('change', { target: { name: 'surname', value: 'livrone' } });
        wrapper.find('[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'julianlivrone@gmail.com' } });
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        wrapper.find('[name="gender"]').at(0).simulate('change', { target: { name: 'gender', value: 'M' } });
        wrapper.find('[name="date"]').at(0).simulate('change', 'Sat Sep 18 2021 11:00:00 GMT-0300 (hora estándar de Argentina)');
        wrapper.find('[name="weight"]').at(0).simulate('change', { target: { name: 'weight', value: '90' } });
        wrapper.find('[name="height"]').at(0).simulate('change', { target: { name: 'height', value: '170' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onRegister).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })
})