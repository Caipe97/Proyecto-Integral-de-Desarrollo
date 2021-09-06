import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import logo from '../images/logo_small.png';
import './App.css';
import logo1 from '../images/analystic.png';
import logo2 from '../images/phone.png';
import './App.css';

const mapStateToProps = (state) => {
  return {
    id: state.userDataReducer.id,
    name: state.userDataReducer.name,
    surname: state.userDataReducer.surname,
    email: state.userDataReducer.email,
    password: state.userDataReducer.password,
    isPending: state.userDataReducer.isPending
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // onGetData: (id) => dispatch(getData(id)),
//     // onPostData: (title, body, id) => dispatch(postData(title, body, id)),
//     // onPutData: (id, title, body, id) => dispatch(putData(id, title, body, id)),
//     // onDeleteData: (id) => dispatch(deleteData(id))
//   }
// }

function Profile(props) {
  let history = useHistory();
  
  return (
    // <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
    //   <button type="button" onClick={() => history.push("/")}>Go Home</button>
    //   <h1 className='f1'>Profile</h1>
    //   <h2>id: {props.id}</h2>
    //   <h2>Name: {props.name}</h2>
    //   <h2>surname: {props.surname}</h2>
    //   <h2>Email: {props.email}</h2>
    //   <h2>Password: {props.password}</h2>
    //   <h2>IsPending: {(props.isPending).toString()}</h2>


    // </div>
    <div className="contenedor">
      <header className="header">
      <div style={{width:'100%',position:'relative'}}> 
      <div className="box" style={{}}>
          <img src={logo} alt="imagen tracking" style={{width: 100}} />
          </div>
          <div className="box" style={{  position:'absolute',right:'30px'}}>
          <button type="button" onClick={() => history.push("/")}>Log out</button>
      </div>
      </div>
      </header>
      

      <div className="contenido"> 
        <h1>Contenido</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
        <br></br>
        Ut eget quam molestie justo at nibh lacus, euismod purus eu sem sit amet pede. In accumsan orci. Proin aliquam enim ut leo. In hac habitasse platea dictumst. Duis neque ac erat. Integer eros vulputate at, bibendum vel, wisi. Mauris eros diam magna neque, fringilla et, erat. Sed eros. Mauris aliquet quis, justo. Vivamus posuere dui. In congue fringilla id, elementum eleifend, ligula. Ut eget magna. Donec tempus nulla. Aliquam gravida eros sagittis malesuada. Donec nonummy, mi. Donec in faucibus ligula. Ut sit amet, sodales dui at metus.
        </p>
      </div>
    <div className="sidebar">
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%', flexDirection: 'column'}}>
      <h1 className='f1'>Perfil</h1>
      <h2>id: {props.id}</h2>
      <h2>Name: {props.name}</h2>
      <h2>surname: {props.surname}</h2>
      <h2>Email: {props.email}</h2>
      <h2 style={{fontWeight:100}}>Password: {props.password}</h2>            
      {/* PASS WORD HIDE */}
      <h2>IsPending: {(props.isPending).toString()}</h2>
      <Link to="/resetPassword" style={{color: 'black'}}>Reset your password</Link>
  </div>
    </div>
    <div className="widget1">
      <h3>Calorias</h3>
      <img src={logo1} alt="imagen calorias" style={{width: 100,height:60}} />
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

export default connect(mapStateToProps)(Profile)
