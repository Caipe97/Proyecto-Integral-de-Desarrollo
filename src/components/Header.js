import React from 'react';
import logo from '../images/logo_small.png';
import { useHistory } from "react-router-dom";

const Header = ({ userId }) => {
  let history = useHistory();
  return ( 
  <header className="header">
    <div style={{ width: '100%', position: 'relative' }}>
      <div className="box">
        <img src={logo} alt="imagen tracking" style={{ width: 100 }} />
        {userId > 0 ? <button type="button" onClick={() => history.push("/")}>Log out</button> : null}
      </div>
    </div>
  </header>
  )
}

export default Header;