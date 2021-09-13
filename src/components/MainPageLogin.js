import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../pages/Login/Login.css';
import logo1 from '../images/avatar.png';
import logo2 from '../images/2pages.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextField from '@material-ui/core/TextField';


class MainPageLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = await this.props.onLogin(this.state.email, this.state.password);
    this.setState({email: '', password: ''});
    
    if(data){
      this.props.history.push("/profile");
    } else{
      console.log("no");
    }
    
  };
  render() {
    return (
      <div className="contenedorL">
        <Header userId={this.props.id} onLogout={this.props.onLogout}/>

        <div className="contenidoL">
          <div className="col1">
          <img src={logo2} alt="imagen tracking" style={{ width:240,height:240 }} />
          <div>
          <h1 style={{left:'30px'}}>Nutriva</h1>
          </div>
          
          
          </div>
          
          <div className="col2" style ={{justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>
          <p >
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          
          </p>
          </div>
          
        </div>
        <div className="sidebar">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className="box" style={{}}>
              <img src={logo1} alt="imagen tracking" style={{ width: 100 }} />
            </div>
            <div style={{ marginTop: 45 }}>
              <h1 className='f1'>Login</h1>
            </div>

            <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <TextField label="Email" name='email' type='email' value={this.state.email} onChange={this.handleChange} required/>
              <TextField label="Password" name='password' type='password' value={this.state.password} onChange={this.handleChange} required/>
              <button onClick={this.handleSubmit} className='button'>Iniciar Sesion</button>
              <p style={{marginBlock: '0em', marginTop: '4%'}}>Todavia no tenes una cuenta?
                <Link to="/register" style={{color: 'black'}}>Registrate</Link>
              </p>
              <p style={{fontSize:'10px',marginTop:'4%'}}>
                Olvidaste la contrasena?
              </p>
            </form>
          </div>
        </div>
      
        <Footer/>
      </div>

    );
  }
}

export default MainPageLogin
