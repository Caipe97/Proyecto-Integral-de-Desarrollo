import React from 'react';
import { useHistory } from "react-router-dom";
import './App.css';

function Home() {
  let history = useHistory();

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
      <h1 className='f1'>Home</h1>
      <button type="button" onClick={() => history.push("/login")}>Go Login</button>
      <button type="button" onClick={() => history.push("/register")}>Go Register</button>
    </div>
  );
}

export default (Home)