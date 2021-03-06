import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../pages/Login/Login.css';
import logo2 from '../../images/2pages.jpg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TextField from '@material-ui/core/TextField';

//const bcrypt = require('bcryptjs');
/* eslint-disable */
class LoginMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      errorMessage: ''
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateAll()) {
      const data = await this.props.onLogin(this.state.email, this.state.password);
      this.setState({ email: '', password: '' });
      if (data.payload.userId) {
        this.props.history.push("/profile");
      } else {
        this.setState({...this.state, errorMessage: 'Email y/o contraseña incorrectos'});
      }
    } else {
      this.setState({...this.state, errorMessage: 'No completaste los campos correctamente'});
    }
  };

  validateAll = () => {
    if (this.validateEmail(this.state.email) && this.validatePassword(this.state.password)) {
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
        <Header {...this.props} />
        <div className="contenidoL" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <div className="col1">
            <img src={logo2} alt="imagen tracking" style={{ width: 200, height: 200 }} />
          </div>
          <div className="col3">
            <h1 style={{ left: '30px', color:'#002626', fontFamily: 'Arial'}}>Buscamos</h1>
            <br></br>
            <p>Contribuir al desarrollo integral de los clientes mediante el diseño y la aplicación de un conjunto de servicios que fortalezcan la salud física y mental.</p>
          </div>

          <div className="col2" style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center', paddingLeft: '10%', paddingRight: '10%'}}>
             <br></br>
              <p>Ayudar a nuestros socios a crear y mantener una excelente condición física a través de la nutrición y programas de entrenamiento.</p>
              <br></br>
              <p>Inculcar en niños, jóvenes y adultos, el valor de la salud y el ejercicio.</p>
              <br></br>
              <p>Participar proactivamente en el bienestar de las personas en su entorno social y laboral.</p>
              <br></br>
              <p>Brindar un servicio único y facilitar las herramientas del éxito.</p>
          </div>

        </div>
        <div className="sidebar">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <div style={{ marginTop: 45 }}>
              <h1 className='f1' style={{color:'#002626', fontFamily: 'Arial'}}>Iniciar Sesión</h1>
            </div>

            <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <TextField label="Email" name='email' type='email' value={this.state.email} onChange={this.handleChange} required />
              <TextField label="Contraseña" name='password' type='password' value={this.state.password} onChange={this.handleChange} required />
              <button onClick={this.handleSubmit} className='button'>Iniciar Sesión</button>
              <p>{this.state.errorMessage}</p>
              {this.props.isPending
              ? <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              : null}
              <p style={{ marginBlock: '0em', marginTop: '4%' }}>Todavía no tenes una cuenta?
                <Link to="/register" style={{ color: 'black' }}>Registrate</Link>
              </p>
            </form>
          </div>
        </div>

        <Footer />

      </div>

    );
  }
}

export default LoginMainPage



