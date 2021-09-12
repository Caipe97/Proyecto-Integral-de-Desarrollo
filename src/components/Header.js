import React from 'react';
import { useHistory, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo_small.png';

const Header = (props) => {
  let history = useHistory();
  return ( 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container">
          <img src={logo} alt="imagen tracking" style={{ width: 100 }} />
          {props.userId > 0 
          ? <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Alimentos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link">Create Note</Link>
                  </li>
                  <li>
                    <button type="button" onClick={() => {props.onLogout(); history.push("/")}}>Log out</button> 
                  </li>
              </ul>
            </div>
          : null}
        </div>
    </nav>
  )
}

export default Header;