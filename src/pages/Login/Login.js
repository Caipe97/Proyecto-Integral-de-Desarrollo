import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../store/userData/userDataActions';
import { useHistory, Link } from "react-router-dom";
import '../App/App.css';
import logo1 from '../../images/avatar.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TextField from '@material-ui/core/TextField';

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
    onLogin: (email, password) => dispatch(login(email, password)),
    onLogout: () => dispatch(logout())
  }
}

function Login(props) {
  let [state, setState] = useState({
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await props.onLogin(state.email, state.password);
    setState({email: '', password: ''});
    if(data){
      history.push("/profile");
    } else{
      console.log("no")
    }
  };
  
  return (
    <div className="contenedor">
      <Header userId={props.id} onLogout={props.onLogout}/>

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
            <h1 className='f1'>Login</h1>
          </div>

          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <TextField label="Email" name='email' type='email' value={state.email} onChange={handleChange} required/>
            <TextField label="Password" name='password' type='password' value={state.password} onChange={handleChange} required/>
            <button onClick={handleSubmit} className='button'>Iniciar Sesion</button>
          </form>
          <p style={{marginBlock: '0em', marginTop: '4%'}}>Todavia no tenes una cuenta?
            <Link to="/register" style={{color: 'black'}}>Registrate</Link>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
