import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../store/userData/userDataActions';
import { useHistory, Link } from "react-router-dom";
import './Login.css';
import logo1 from '../../images/avatar.png';
import logo2 from '../../images/2pages.jpg';
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
    <div className="contenedorL">
      <Header userId={props.id} onLogout={props.onLogout}/>

      <div className="contenidoL">
        <div className="col1">
        <img src={logo2} alt="imagen tracking" style={{ width:240,height:240 }} />
        <div>
        <h1 style={{left:'30px'}}>Nutriva</h1>
        </div>
        
        
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
          <p style={{fontSize:'10px',marginTop:'4%'}}>
            Olvidaste la contrasena?
          </p>
        </div>
      </div>
     
      <Footer/>
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
