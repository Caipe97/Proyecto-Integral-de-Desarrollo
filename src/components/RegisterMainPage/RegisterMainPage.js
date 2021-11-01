import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import '../../pages/Register/Register.css';
import logo2 from '../../images/2pages.jpg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LOGIN_OR_REGISTER_SUCCESS } from '../../store/userData/userDataConstants';

//const bcrypt = require('bcryptjs');
/* eslint-disable */
class RegisterMainPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      gender: '',
      birthday: '',
      weight: '',
      height: '',
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

  handleChangeBirthday = date => {
    const today = new Date();
    if(Date.parse(date) > Date.parse(today)){
      date = today
    }
    this.setState({
      ...this.state,
      birthday: date,
      errorMessage: ''
    })
  };

  handleSubmit = async event => {
    event.preventDefault();
    const birhtdayString = this.state.birthday.toString().substring(4, 24);
    if(this.validateAll()){
      const data = await this.props.onRegister(this.state.name, this.state.surname, this.state.email, this.state.password, this.state.gender, birhtdayString, this.state.weight, this.state.height);
      this.setState({ name: '', surname: '', email: '', password: '', gender: '', birthday: '', weight: '', height: '' });
      if(data.type === LOGIN_OR_REGISTER_SUCCESS){
        this.props.history.push("/profile");
      } else {
        this.setState({...this.state, errorMessage: 'Ya existe un usuario con ese email'});
      }
    } else {
      this.setState({...this.state, errorMessage: 'No completaste los campos correctamente'});
    }
  };

  validateAll = () => {
    if(this.validateName(this.state.name) && 
      this.validateSurname(this.state.surname) && 
      this.validateEmail(this.state.email) && 
      this.validatePassword(this.state.password) &&
      this.validateGender(this.state.gender) &&
      this.validateWeight(this.state.weight) &&
      this.validateHeight(this.state.height)){
        return true;
    }
    else{
        return false;
    }
  }

  validateName = (name) => { //cannot be empty and only letters
    const expression = /^[a-z ,.'-]+$/i 
    return expression.test(String(name).toLowerCase())
  }

  validateSurname = (surname) => { //cannot be empty and only letters
    const expression = /^[a-z ,.'-]+$/i 
    return expression.test(String(surname).toLowerCase())
  }

  validateEmail = (email) => { //cannot be empty and valid mail
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }
  
  validatePassword = (password) => { //cannot be empty
    const expression = /(.|\s)*\S(.|\s)*/ 
    return expression.test(String(password).toLowerCase())
  }

  validateGender = (gender) => { //cannot be empty and only letters
    const expression = /^[a-z ,.'-]+$/i 
    return expression.test(String(gender).toLowerCase())
  }

  validateWeight = (weight) => { //cannot be empty and only numbers
    const expression = /^\d+$/
    return expression.test(String(weight).toLowerCase())
  }

  validateHeight = (height) => { //cannot be empty and only numbers
    const expression = /^\d+$/
    return expression.test(String(height).toLowerCase())
  }

  render() {
    return (
      <div className="contenedorRe">
        <Header userId={this.props.userId} onLogout={this.props.onLogout} history={this.props.history}/>
        <div className="contenidoRe" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center'}}>
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
              <h1 className='f1' style={{color:'#002626', fontFamily: 'Arial'}}>Register</h1>
            </div>
  
            <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <TextField label="Name" name='name' type='name' value={this.state.name} onChange={this.handleChange} required />
              <TextField label="Surname" name='surname' type='surname' value={this.state.surname} onChange={this.handleChange} required />
              <TextField label="Email" name='email' type='email' value={this.state.email} onChange={this.handleChange} required />
              <TextField label="Password" name='password' type='password' value={this.state.password} onChange={this.handleChange} required />
              <div style={{margin: 10}}>
                <input type="radio" id="masculino" name="gender" value="M" onChange={this.handleChange}/>
                <label>Masculino</label>
                <input type="radio" id="femenino" name="gender" value="F" onChange={this.handleChange}/>
                <label>Femenino</label>
              </div>
  
              <DatePicker
                name='date'
                selected={this.state.birthday}
                onChange={(date) => this.handleChangeBirthday(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText='birthday'
              />
              <TextField label="Weight" name='weight' type='weight' value={this.state.weight} onChange={this.handleChange} required />
              <TextField label="Height" name='height' type='height' value={this.state.height} onChange={this.handleChange} required />
              <button onClick={this.handleSubmit} className='button'>Registrarse</button>
              <p>{this.state.errorMessage}</p>
              {this.props.isPending
              ? <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              : null}
              <p style={{ marginBlock: '0em', marginTop: '10%' }}>Si ya tenes una cuenta?</p>
              <Link to="/" style={{ color: 'black' }}>Login</Link>
            </form>
          </div>
        </div>
        <Footer />
      </div>
  
    );
  }
}

export default RegisterMainPage
