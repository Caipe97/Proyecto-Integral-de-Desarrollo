import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import '../App/App.css';
import logo1 from '../../images/analystic.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const mapStateToProps = (state) => {
  return {
    id: state.userDataReducer.id,
    name: state.userDataReducer.name,
    surname: state.userDataReducer.surname,
    email: state.userDataReducer.email,
    password: state.userDataReducer.password,
    gender: state.userDataReducer.gender,
    birthday: state.userDataReducer.birthday,
    weight: state.userDataReducer.weight,
    height: state.userDataReducer.height,
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

    <div className="contenedor">
      <Header userId={props.id}/>

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
      <h2>Id: {props.id}</h2>
      <h2>Name: {props.name}</h2>
      <h2>Surname: {props.surname}</h2>
      <h2>Email: {props.email}</h2>
      <h2 style={{color: 'red'}}>Password: {props.password}</h2>            
      {/* PASS WORD HIDE */}
      <h2>Gender: {props.gender}</h2>
      <h2>Birthday: {props.birthday}</h2>
      <h2>Weight: {props.weight}</h2>
      <h2>Height: {props.height}</h2>
      <Link to="/resetPassword" style={{color: 'black'}}>Reset your password</Link>
      <button type="button" onClick={() => history.push("/records")}>Go to Records</button>
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
    <Footer/>
  </div>

  );
}

export default connect(mapStateToProps)(Profile)