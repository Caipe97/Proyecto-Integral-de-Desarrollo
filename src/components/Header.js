import React, {Component} from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo_small.png';

class Header extends Component{
  render() {
    return ( 
      <div className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
          <div className="container">
            <img src={logo} alt="imagen tracking" style={{ width: 100 }} />
            {this.props.userId > 0 
            ? <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                      <Link to="/" className="nav-link">Alimentos</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/create" className="nav-link">Create Note</Link>
                    </li>
                    <li>
                      <button type="button" onClick={() => {
                          this.props.onLogout();
                          this.props.history.push("/");
                        }
                      }>Log out</button> 
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