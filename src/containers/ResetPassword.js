import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions';
import { useHistory } from "react-router-dom";
import FormInput from '../components/FormInput';
import './App.css';
import logo2 from '../images/phone.png';
import logo from '../images/logo_small.png';


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
    onResetPassword: (id, password) => dispatch(resetPassword(id, password))
  }
}

function ResetPassword(props) {
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');

  let history = useHistory();
  
  const handleChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onResetPassword(props.id, password);
    setPassword('');
    setMessage('Contraseña cambiada con exito');
  };
  
  return (
   <div className="contenedorReset">
 <header className="headerReset">
      <div className="box" style={{}}>
          <img src={logo} alt="imagen tracking" style={{width: 100}} />
      </div>
      </header>

   <div className="contenidoReset" style={{background:"#fff",  textAlign: 'center',  alignItems: 'center',  justifyContent: 'center',  }}>
      <h1 className='f1'>ResetPassword</h1>
      <form>
        <FormInput name='password' type='password' placeholder='New password' handleChange={handleChange} required/>
      </form>
      <button onClick={handleSubmit}>ResetPassword</button>
      <p style={{color: 'black'}}>{message}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
