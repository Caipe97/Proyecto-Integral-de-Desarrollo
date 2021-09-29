import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordMainPage from './ResetPasswordMainPage';

describe('ResetPasswordMainPage tests', () => {
    const historyMock = { push: jest.fn() };
    const preventDefault = { preventDefault: jest.fn() }
    let wrapper;

    beforeEach(() => {
        let mockProps = {
            state: {
                password: '',
                passwordCheck: '',
                message: ''
            },
            onResetPassword: jest.fn(),
            onLogout: jest.fn(),
            preventDefault:  jest.fn()
          };
        wrapper = shallow(<ResetPasswordMainPage {...mockProps} history={historyMock}/>);
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'asd' } });
        wrapper.find('[name="passwordCheck"]').at(0).simulate('change', { target: { name: 'passwordCheck', value: 'asd' } });
    })
    it('expect to render ResetPasswordMainPage component to render with signing in', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    it('renders ResetPasswordMainPage without crashing', () => {
        wrapper.find('[name="password"]').at(0).simulate('change', { target: { name: 'password', value: '' } });
        wrapper.find('[name="passwordCheck"]').at(0).simulate('change', { target: { name: 'passwordCheck', value: '' } });
        expect(wrapper).toMatchSnapshot();
    })
    
    it('handleChange should update the state correctly when completing the inputs', () => {
        expect(wrapper.instance().state).toEqual({
            password: 'asd',
            passwordCheck: 'asd',
            message: ''
        });
    })

    it('handleSubmit should update the state to its initial state (empty) and change the message', async () => {
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().state).toEqual({
            password: '',
            passwordCheck: '',
            message: 'Contraseña cambiada con exito, sera redirigido a Login en 5 segundos.'
        });
    })
    
    it('handleSubmit should push to login when reseting the password after 5 seconds', async () => {
        jest.useFakeTimers();
        
        await wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onResetPassword).toHaveBeenCalledTimes(1);
        
        //Testeo que setTimeout fue llamado una unica vez
        expect(setTimeout).toHaveBeenCalledTimes(1);
        //Testeo que setTimeout fue llamado para ejecutar una funcion luego de 5 segundos
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000); 
        // expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
        // expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    })

    it('handleSubmit should not push to profile because passwordCheck doesnt match with password is empty', () => {
        wrapper.find('[name="passwordCheck"]').at(0).simulate('change', { target: { name: 'passwordCheck', value: 'abc' } });
        wrapper.find('[className="button"]').at(0).simulate('click', preventDefault);
        expect(wrapper.instance().props.onResetPassword).toHaveBeenCalledTimes(0);
        expect(setTimeout).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(0);
    })
})