import React from 'react';
import logo2 from '../images/phone.png';

const Footer = () => (
  <footer className="footer">
    <div style={{ width: '100%', position: 'relative' }}>
      <div className="box">
        <h3>Copyright 2021 JMA Group Ltd.</h3>
        <div className="box">
          <img src={logo2} alt="imagen phone" style={{ width: 40, height: 40 }} />
          <h3 style={{ marginTop: '9%', marginLeft: '5px' }}>4568-9430</h3>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer;