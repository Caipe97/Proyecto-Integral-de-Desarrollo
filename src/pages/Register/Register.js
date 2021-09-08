import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/actions';
import { useHistory } from "react-router-dom";
import FormInput from '../../components/FormInput';
import '../App/App.css';
import logo1 from '../../images/avatar.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const mapStateToProps = (state) => {
  return {
    id: state.userDataReducer.id,
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
    onRegister: (name, surname, email, password) => dispatch(register(name, surname, email, password))
  }
}

function Register(props) {
  let [state, setState] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    weight: 0,
    height: 0
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
    props.onRegister(state.name, state.surname, state.email, state.password, state.gender, state.birthday, state.weight, state.height);
    setState({name: '', surname: '', email: '', password: '', gender: '', birthday: '', weight: 0, height: 0});
    history.push("/profile");
  };

  return (
    <div className="contenedorReset">
    <Header/>

     <div className='contenidoReset' style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
     <div className="box">
         <img src={logo1} alt="imagen tracking" style={{width: 100}} />
     </div>
     <div style={{marginTop:45}}>
     <h1 className='f1'>Register</h1>
     </div>
    
      <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
        <FormInput name='name' type='name' placeholder='name' handleChange={handleChange} required/>
        <FormInput name='surname' type='surname' placeholder='surname' handleChange={handleChange} required/>
        <FormInput name='email' type='email' placeholder='email' handleChange={handleChange} required/>
        <FormInput name='password' type='password' placeholder='password' handleChange={handleChange} required/>
        <FormInput name='gender' type='gender' placeholder='gender' handleChange={handleChange} required/>
        <FormInput name='birthday' type='date' placeholder='birthday' handleChange={handleChange} required/>
        <FormInput name='weight' type='weight' placeholder='weight' handleChange={handleChange} required/>
        <FormInput name='height' type='height' placeholder='height' handleChange={handleChange} required/>
      </form>
      <button onClick={handleSubmit}>Register</button>
      <button type="button" onClick={() => history.push("/")}>Go to Login</button>
    </div>
   <Footer/>
   </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
