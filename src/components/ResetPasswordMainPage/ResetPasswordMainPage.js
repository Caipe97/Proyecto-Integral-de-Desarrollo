import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../../pages/App/App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class ResetPasswordMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordCheck: '',
      message: ''
    };
  }
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      message: ''
    })
  };

  handleSubmit = async event => {
    event.preventDefault();
    if(this.validateAll()){
      await this.props.onResetPassword(this.props.userId, this.state.password);      
      this.setState({password: '', passwordCheck: '', message: 'Contraseña cambiada con exito, sera redirigido a Login en 5 segundos.'});
      setTimeout(() => {this.props.history.push("/")}, 5 * 1000);
    } else {
      this.setState({...this.state, message: 'No completaste los campos correctamente'});
    }
  };

  validateAll = () => {
    return this.validatePassword(this.state.password) && this.validatePasswordCheck(this.state.password, this.state.passwordCheck);
  }

  validatePassword = (password) => { //cannot be empty
    const expression = /(.|\s)*\S(.|\s)*/ 
    return expression.test(String(password).toLowerCase())
  }

  validatePasswordCheck = (password, passwordCheck) => {
    return password === passwordCheck;
  }

  render() {
    return (
      <div className="contenedor">
        <Header userId={this.props.userId} onLogout={this.props.onLogout} history={this.props.history}/>
        <div  style={{background:"#f5f6f7",  textAlign: 'center',  alignItems: 'center',  justifyContent: 'center', width: '100%', marginLeft: '100%' }}>
        <h1 className='f1' style={{color: 'rgb(0, 38, 38)', fontFamily: 'Arial'}}>Cambiar Contraseña</h1>
          <form>
            <TextField name='password' type='password' placeholder='Nueva contraseña' onChange={this.handleChange} required/>
            <TextField name='passwordCheck' type='password' placeholder='Repita nueva contraseña' onChange={this.handleChange} required/>
          </form>
          <br></br>
          <button onClick={this.handleSubmit} className='button'>Aceptar</button>
          <p style={{color: 'black'}}>{this.state.message}</p>
          <button type="button" onClick={() => this.props.history.push("/profile")} style={{marginTop: '10%'}}>Volver al Perfil</button>
        </div>
        <Footer/>
      </div>
     );
  }
}

export default ResetPasswordMainPage
