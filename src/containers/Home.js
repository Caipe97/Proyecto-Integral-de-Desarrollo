import React from 'react';
import { useHistory } from "react-router-dom";
import './App.css';

function Home() {
  let history = useHistory();

  return (
    <div className="contenedor">
<header className="header">
  <div style={{width:'100%',position:'relative'}}> 
<div className="box" style={{}}>
    <img src={logo} alt="imagen tracking" style={{width: 100}} />
    </div>
    
</div>
</header>

<div className="contenido"> 
  <h1>Galeria</h1>
  <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  <br></br>
  Ut eget quam molestie justo at nibh lacus, euismod purus eu sem sit amet pede. In accumsan orci. Proin aliquam enim ut leo. In hac habitasse platea dictumst. Duis neque ac erat. Integer eros vulputate at, bibendum vel, wisi. Mauris eros diam magna neque, fringilla et, erat. Sed eros. Mauris aliquet quis, justo. Vivamus posuere dui. In congue fringilla id, elementum eleifend, ligula. Ut eget magna. Donec tempus nulla. Aliquam gravida eros sagittis malesuada. Donec nonummy, mi. Donec in faucibus ligula. Ut sit amet, sodales dui at metus.
  </p>
</div>
<div className="sidebar">
<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
      <h1 className='f1'>Home</h1>
      <button type="button" onClick={() => history.push("/login")}>Go Login</button>
      <button type="button" onClick={() => history.push("/register")}>Go Register</button>
    </div>
</div>
<div className="widget1">
<h3>Calorias</h3>
</div>
<div className="widget2">
<h3>Tracking semanal</h3>
<img src="https://www.zohowebstatic.com/sites/default/files/column-chart.jpg" alt="imagen tracking" style={{width: 100, height: 50}} />
</div>
<footer className="footer">
<div style={{width:'100%',position:'relative'}}> 
      <div className="box" style={{width:'50%'}}>
      <h3>Copyright 2021 JMA Group Ltd.</h3>
          </div>
          <div className="box" style={{  position:'absolute',right:'50px'}}>
          <img src={logo2} alt="imagen phone" style={{width: 40,height:40}} />
          <h3 style={{marginTop:'-5px'}}>4568-9430</h3>
      </div>
      </div>
</footer>
</div>

  );
}

export default (Home)
