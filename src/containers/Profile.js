import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom";

import './App.css';

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

function Profile(props) {
  let history = useHistory();
  
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
      <button type="button" onClick={() => history.push("/")}>Go Home</button>
      <h1 className='f1'>Profile</h1>
      <h2>id: {props.id}</h2>
      <h2>Name: {props.name}</h2>
      <h2>surname: {props.surname}</h2>
      <h2>Email: {props.email}</h2>
      <h2>Password: {props.password}</h2>
      <h2>IsPending: {(props.isPending).toString()}</h2>
      <Link to="/resetPassword" style={{color: 'white'}}>Reset your password</Link>
    </div>
  );
}

export default connect(mapStateToProps)(Profile)