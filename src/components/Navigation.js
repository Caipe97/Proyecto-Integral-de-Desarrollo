import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo_small.png';

const Navigation = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src={logo} alt="imagen tracking" style={{ width: 100 }} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create" className="nav-link">Create Note</Link>
                    </li>
                    <li className="nav-item">
                        {/* <Link to="/user" className="nav-link">Create User</Link> */}
                        <Link to="/register" className="nav-link">Registrate</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

)

export default Navigation;