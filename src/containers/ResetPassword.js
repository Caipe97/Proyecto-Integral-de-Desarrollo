import React, { useState } from 'react';
import { connect } from 'react-redux';

import { resetPassword } from '../actions';

import { useHistory } from "react-router-dom";

import FormInput from '../components/FormInput';

import './App.css';

const mapStateToProps = (state) => {
  return {
    id: state.userDataReducer.id,
    name: state.userDataReducer.name,
    surname: state.userDataReducer.surname,
    email: state.userDataReducer.email,
    password: state.userDataReducer.password,
    isPending: state.userDataReducer.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResetPassword: (id, password) => dispatch(resetPassword(id, password))
  }
}

function ResetPassword(props) {
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');

  let history = useHistory();
  
  const handleChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onResetPassword(props.id, password);
    setPassword('');
    setMessage('Contraseña cambiada con exito');
  };
  
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
      <h1 className='f1'>ResetPassword</h1>
      <form>
        <FormInput name='password' type='password' placeholder='New password' handleChange={handleChange} required/>
      </form>
      <button onClick={handleSubmit}>ResetPassword</button>
      <p style={{color: 'white'}}>{message}</p>
      <button type="button" onClick={() => history.push("/login")}>Go to Login</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)