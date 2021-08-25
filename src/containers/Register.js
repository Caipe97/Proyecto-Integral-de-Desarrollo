import React, { useState } from 'react';
import { connect } from 'react-redux';

import { register } from '../actions';

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
    onRegister: (name, surname, email, password) => dispatch(register(name, surname, email, password))
  }
}

function Register(props) {
  let [state, setState] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  let history = useHistory();

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onRegister(state.name, state.surname, state.email, state.password);
    setState({name: '', surname: '', email: '', password: ''});
    history.push("/profile");
  };

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
      <h1 className='f1'>Register</h1>
      <form>
        <FormInput name='name' type='name' placeholder='name' handleChange={handleChange} required/>
        <FormInput name='surname' type='surname' placeholder='surname' handleChange={handleChange} required/>
        <FormInput name='email' type='email' placeholder='email' handleChange={handleChange} required/>
        <FormInput name='password' type='password' placeholder='password' handleChange={handleChange} required/>
      </form>
      <button onClick={handleSubmit}>Register</button>
      <button type="button" onClick={() => history.push("/")}>Go to Home</button>
      <button type="button" onClick={() => history.push("/login")}>Go to Login</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
