import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword, logout } from '../../store//userData/userDataActions';
import ResetPasswordMainPage from '../../components/ResetPasswordMainPage';

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
    onResetPassword: (userId, password) => dispatch(resetPassword(userId, password)),
    onLogout: () => dispatch(logout())
  }
}

class ResetPassword extends Component {
  render() {
    return (
      <ResetPasswordMainPage {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
