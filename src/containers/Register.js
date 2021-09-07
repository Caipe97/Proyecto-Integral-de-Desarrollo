import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import { useHistory } from "react-router-dom";
import FormInput from '../components/FormInput';
import './App.css';
import logo2 from '../images/phone.png';
import logo from '../images/logo_small.png';
import logo1 from '../images/avatar.png';

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
    <div className="contenedorReset">
<header className="headerReset">
     <div className="box" style={{}}>
         <img src={logo} alt="imagen tracking" style={{width: 100}} />
     </div>
     </header>

     <div className='contenidoReset' style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
     <div className="box" style={{}}>
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
      </form>
      <button onClick={handleSubmit}>Register</button>
      <button type="button" onClick={() => history.push("/")}>Go to Home</button>
      <button type="button" onClick={() => history.push("/login")}>Go to Login</button>
    </div>
   <footer className="footerReset">
   <div style={{width:'100%',position:'relative'}}> 
      <div className="box" style={{width:'50%'}}>
      <h3>Copyright 2021 JMA Group Ltd.</h3>
          </div>
          <div className="box" style={{  position:'absolute',right:'50px'}}>
          <img src={logo2} alt="imagen phone" style={{width: 40,height:40}} />
          <h3 style={{marginTop:'-5px'}}>4568-9430</h3>
      </div>
      </div>
   </footer>
   </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
