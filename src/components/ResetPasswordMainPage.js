import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../pages/App/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = async event => {
    event.preventDefault();
    if(this.validateAll()){
      await this.props.onResetPassword(this.props.userId, this.state.password);      
      this.setState({password: '', passwordCheck: '', message: 'Contraseña cambiada con exito, sera redirigido a Login en 5 segundos.'});
      setTimeout(() => {this.props.history.push("/")}, 5 * 1000);
    } else {
      console.log('No completaste los campos correctamente');
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
        <div  style={{background:"#fff",  textAlign: 'center',  alignItems: 'center',  justifyContent: 'center', width: '100%', marginLeft: '100%' }}>
          <h1 className='f1'>ResetPasswordMainPage</h1>
          <form>
            <TextField name='password' type='password' placeholder='New password' onChange={this.handleChange} required/>
            <TextField name='passwordCheck' type='password' placeholder='New password again' onChange={this.handleChange} required/>
          </form>
          <br></br>
          <button onClick={this.handleSubmit} className='button'>Reset password</button>
          <p style={{color: 'black'}}>{this.state.message}</p>
        </div>
        <Footer/>
      </div>
     );
  }
}

export default ResetPasswordMainPage
