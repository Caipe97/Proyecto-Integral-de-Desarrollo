import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo_small.png';

class Header extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="header" style={{ background: '#0E4749', paddingTop: '10px', paddingBottom: '10px', top: 0 }}>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark p-3">
          <div className="container">
            <img src={logo} alt="imagen tracking" style={{ width: 100 }} />
            {this.props.userId > 0
              ? <div className="collapse navbar-collapse" id="navbarNav" style={{height:'23px'}}>
                <ul className="navbar-nav ms-auto">
                  <li>
                    <button type="button" className='btn btn--primary btn--s' style={{ backgroundColor: 'white',boxShadow:' 0px 0px 5px 1px black '}} onClick={() => {
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