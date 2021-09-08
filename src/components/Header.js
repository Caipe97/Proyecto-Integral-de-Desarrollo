import React from 'react';
import logo from '../images/logo_small.png';
import { useHistory } from "react-router-dom";
import { logout } from '../store/actions';
import { connect } from 'react-redux';

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout())
  }
}

const Header = (props) => {
  let history = useHistory();
  return ( 
  <header className="header">
    <div style={{ width: '100%', position: 'relative' }}>
      <div className="box">
        <img src={logo} alt="imagen tracking" style={{ width: 100 }} />
        {props.userId > 0 ? <button type="button" onClick={() => {props.onLogout(); history.push("/")}}>Log out</button> : null}
      </div>
    </div>
  </header>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);