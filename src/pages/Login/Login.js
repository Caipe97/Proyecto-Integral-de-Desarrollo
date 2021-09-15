import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../store/userData/userDataActions';
import LoginMainPage from '../../components/LoginMainPage';

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
    onLogin: (email, password) => dispatch(login(email, password)),
    onLogout: () => dispatch(logout())
  }
}

class Login extends Component{
  render() {
    return (
      <LoginMainPage {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
