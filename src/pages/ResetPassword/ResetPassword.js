import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../store/actions';
import { useHistory } from "react-router-dom";
import FormInput from '../../components/FormInput';
import '../App/App.css';
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
     <Header userId={props.id}/>

   <div className="contenidoReset" style={{background:"#fff",  textAlign: 'center',  alignItems: 'center',  justifyContent: 'center',  }}>
      <h1 className='f1'>ResetPassword</h1>
      <form>
        <FormInput name='password' type='password' placeholder='New password' handleChange={handleChange} required/>
      </form>
      <button onClick={handleSubmit}>ResetPassword</button>
      <p style={{color: 'black'}}>{message}</p>
      <button type="button" onClick={() => history.push("/profile")}>Go to Profile</button>
      <button type="button" onClick={() => history.push("/")}>Go to Login</button>
    </div>
    <Footer/>
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
