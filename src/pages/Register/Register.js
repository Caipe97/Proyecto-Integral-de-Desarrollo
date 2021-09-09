import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/actions';
import { useHistory, Link } from "react-router-dom";
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
    onRegister: (name, surname, email, password, gender, birthday, weight, height) => dispatch(register(name, surname, email, password, gender, birthday, weight, height))
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
    <div className="contenedor">
      <Header userId={props.id}/>
      <div className="contenido">
        <h1>Contenido</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br></br>
          Ut eget quam molestie justo at nibh lacus, euismod purus eu sem sit amet pede. In accumsan orci. Proin aliquam enim ut leo. In hac habitasse platea dictumst. Duis neque ac erat. Integer eros vulputate at, bibendum vel, wisi. Mauris eros diam magna neque, fringilla et, erat. Sed eros. Mauris aliquet quis, justo. Vivamus posuere dui. In congue fringilla id, elementum eleifend, ligula. Ut eget magna. Donec tempus nulla. Aliquam gravida eros sagittis malesuada. Donec nonummy, mi. Donec in faucibus ligula. Ut sit amet, sodales dui at metus.
        </p>
      </div>
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="box" style={{}}>
            <img src={logo1} alt="imagen tracking" style={{ width: 100 }} />
          </div>
          <div style={{ marginTop: 45 }}>
            <h1 className='f1'>Register</h1>
          </div>

          <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
            <FormInput name='name' type='name' placeholder='name' value={state.name} handleChange={handleChange} required/>
            <FormInput name='surname' type='surname' placeholder='surname' value={state.surname} handleChange={handleChange} required/>
            <FormInput name='email' type='email' placeholder='email' value={state.email} handleChange={handleChange} required/>
            <FormInput name='password' type='password' placeholder='password' value={state.password} handleChange={handleChange} required/>
            <FormInput name='gender' type='gender' placeholder='gender' value={state.gender} handleChange={handleChange} required/>
            <FormInput name='birthday' type='date' placeholder='birthday' value={state.birthday} handleChange={handleChange} required/>
            <FormInput name='weight' type='weight' placeholder='weight' value={state.weight} handleChange={handleChange} required/>
            <FormInput name='height' type='height' placeholder='height' value={state.height} handleChange={handleChange} required/>
          </form>
          <button onClick={handleSubmit} style={{margin: '10px'}}>Registrarse</button>
          <p style={{marginBlock: '0em', marginTop: '10%'}}>Si ya tenes una cuenta?</p>
          <Link to="/" style={{color: 'black'}}>Login</Link>
        </div>
      </div>
      <div className="widget1">
        <h3>Dato1</h3>
      </div>
      <div className="widget2">
        <h3>Dato2</h3>
        <img src="https://www.zohowebstatic.com/sites/default/files/column-chart.jpg" alt="imagen tracking" style={{ width: 100, height: 50 }} />
      </div>
      <Footer/>
   </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
