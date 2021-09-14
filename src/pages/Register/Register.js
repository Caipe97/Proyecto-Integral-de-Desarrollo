import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register, logout } from '../../store//userData/userDataActions';
import { useHistory, Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import './Register.css';
import logo1 from '../../images/avatar.png';
import logo2 from '../../images/2pages.jpg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    onRegister: (name, surname, email, password, gender, birthday, weight, height) => dispatch(register(name, surname, email, password, gender, birthday, weight, height)),
    onLogout: () => dispatch(logout())
  }
}

function Register(props) {
  let [state, setState] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    gender: '',
    weight: 0,
    height: 0
  });

  let [birthday, setBirthday] = useState('');

  let history = useHistory();

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    const birhtdayString = birthday.toString().substring(4, 24);
    props.onRegister(state.name, state.surname, state.email, state.password, state.gender, birhtdayString, state.weight, state.height);
    setState({ name: '', surname: '', email: '', password: '', gender: '', birthday: '', weight: 0, height: 0 });
    history.push("/profile");
  };

  return (
    <div className="contenedorRe">
      <Header userId={props.id} onLogout={props.onLogout} history={history}/>
      <div className="contenidoRe">
        <div className="col1">
        <img src={logo2} alt="imagen tracking" style={{ width:240,height:240 }} />
        
        <h1 style={{left:'49%'}}>Nutriva</h1> 
        </div>
        
        <div className="col2" style ={{justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>
        
        <p >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        </div>
        
      </div>
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="box" style={{}}>
            <img src={logo1} alt="imagen tracking" style={{ width: 100 }} />
          </div>
          <div style={{ marginTop: 45 }}>
            <h1 className='f1'>Register</h1>
          </div>

          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <TextField label="Name" name='name' type='name' value={state.name} onChange={handleChange} required />
            <TextField label="Surname" name='surname' type='surname' value={state.surname} onChange={handleChange} required />
            <TextField label="Email" name='email' type='email' value={state.email} onChange={handleChange} required />
            <TextField label="Password" name='password' type='password' value={state.password} onChange={handleChange} required />
            <TextField label="Gender" name='gender' type='gender' value={state.gender} onChange={handleChange} required />
            <DatePicker
              showTimeSelect
              selected={birthday}
              onChange={(date) => setBirthday(date)}
              dateFormat="dd-MM-yyyy h:mm aa"
              placeholderText='birthday'
            />
            <TextField label="Weight" name='weight' type='weight' value={state.weight} onChange={handleChange} required />
            <TextField label="Height" name='height' type='height' value={state.height} onChange={handleChange} required />
            <button onClick={handleSubmit} className='button'>Registrarse</button>
            <p style={{ marginBlock: '0em', marginTop: '10%' }}>Si ya tenes una cuenta?</p>
            <Link to="/" style={{ color: 'black' }}>Login</Link>
          </form>
        </div>
      </div>
      {/* <div className="widget1">
        <h3>Dato1</h3>
      </div>
      <div className="widget2">
        <h3>Dato2</h3>
        <img src="https://www.zohowebstatic.com/sites/default/files/column-chart.jpg" alt="imagen tracking" style={{ width: 100, height: 50 }} />
      </div> */}
      <Footer />
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
