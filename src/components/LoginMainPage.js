import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../pages/Login/Login.css';
import logo1 from '../images/avatar.png';
import logo2 from '../images/2pages.jpg';
import Header from './Header';
import Footer from './Footer';
import TextField from '@material-ui/core/TextField';
import { LOGIN_OR_REGISTER_SUCCESS } from '../store/userData/userDataConstants';

/* eslint-disable */
class LoginMainPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if(this.validateAll()) {
      const data = await this.props.onLogin(this.state.email, this.state.password);
      this.setState({email: '', password: ''});
      if(data.type === LOGIN_OR_REGISTER_SUCCESS){
        this.props.history.push("/profile");
      } else{
        console.log("Email y/o contraseña incorrectos");
      }
    } else {
      console.log('No completaste los campos correctamente');
    }
  };

  validateAll = () => {
    if(this.validateEmail(this.state.email) && this.validatePassword(this.state.password)) {
      return true;
    }
    return false;
  }

  validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
  }

  validatePassword = (password) => {
    const expression = /(.|\s)*\S(.|\s)*/ 
    return expression.test(String(password).toLowerCase())
  }

  render() {
    return (
      <div className="contenedorL">
        <Header {...this.props}/>

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
              <TextField label="Email" name='email' type='email' value={this.state.email} onChange={this.handleChange} required/>
              <TextField label="Password" name='password' type='password' value={this.state.password} onChange={this.handleChange} required/>
              <button onClick={this.handleSubmit} className='button'>Iniciar Sesion</button>
              <p style={{marginBlock: '0em', marginTop: '4%'}}>Todavia no tenes una cuenta?
                <Link to="/register" style={{color: 'black'}}>Registrate</Link>
              </p>
              <p style={{fontSize:'10px',marginTop:'4%'}}>
                Olvidaste la contrasena?
              </p>
            </form>
          </div>
        </div>
      
        <Footer/>
      </div>

    );
  }
}

export default LoginMainPage
