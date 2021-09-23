import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo_small.png';
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="header" style={{ background: '#0E4749', paddingTop: '10px', paddingBottom: '10px', top: 0 }}>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark p-3">
          <div className="container">
            <img src={logo} alt="imagen tracking" style={{ width: 200 }} />
            {this.props.userId > 0
              ? <div className="collapse navbar-collapse" id="navbarNav" style={{height:'23px'}}>
                <ul className="navbar-nav ms-auto">
                  <li>
                    <Link name='link' style={{color: 'white', textDecoration: 'none'}} onClick={() => {
                      this.props.onLogout();
                      this.props.history.push("/");
                    }
                    }>Cerrar Sesión</Link>
                  </li>
                </ul>
              </div>
              : null}
          </div>
        </nav>
      </div>
    )
  }
}

export default Header;