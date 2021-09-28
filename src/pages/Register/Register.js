import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { register, logout } from '../../store//userData/userDataActions';
import RegisterMainPage from '../../components/RegisterMainPage/RegisterMainPage';

const mapStateToProps = (state) => {
  return {
    userId: state.userDataReducer.userId,
    name: state.userDataReducer.name,
    surname: state.userDataReducer.surname,
    email: state.userDataReducer.email,
    password: state.userDataReducer.password,
    gender: state.userDataReducer.gender,
    birthday: state.userDataReducer.birthday,
    weight: state.userDataReducer.weight,
    height: state.userDataReducer.height,
    isPending: state.userDataReducer.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (name, surname, email, password, gender, birthday, weight, height) => dispatch(register(name, surname, email, password, gender, birthday, weight, height)),
    onLogout: () => dispatch(logout())
  }
}

class Register extends Component{
  render() {
    return (
      <RegisterMainPage {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
