import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
// import '../App/App.css';
import './Profile.css';
//import logo1 from '../../images/analystic.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getRecordsFromUser } from '../../store/records/recordsActions';
import { logout } from '../../store/userData/userDataActions';

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

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecordsFromUser: (id) => dispatch(getRecordsFromUser(id)),
    onLogout: () => dispatch(logout())
  }
}

function Profile(props) {
  let history = useHistory();
  return (

    <div className="contenedorPro">
      <Header userId={props.id} onLogout={props.onLogout} />

      <div className="contenidoPro">
        {/* <h1>Contenido</h1> */}
        <div className="search">
          <p>Search</p>
          <button style={{fontSize:'10px'}} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Agregar Alimento</button>
        </div>
        <div className="comida">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </p>
        </div>
      </div>
      <div className="sidebarPro">
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}> */}
        <div className="col3">
          <h1 className='f1'>Perfil</h1>
        </div>
        <div className="col1" style={{height:'100%'}}>
          <p>Name: {props.name}</p>
          <p>Surname: {props.surname}</p>
          <p>Email: {props.email}</p>
          <p>Gender: {props.gender}</p>
          
        </div>
        <div className="col2" style={{height:'100%'}}>
          <p>Birthday: {props.birthday}</p>
          <p>Weight: {props.weight}</p>
          <p>Height: {props.height}</p>
          <Link to="/resetPassword" style={{ color: 'black', marginBottom: '5%' }}>Reset your password</Link>
          
        </div>
      </div>
      {/* <div className="widget1">
      <h3>Calorias</h3>
      <img src={logo1} alt="imagen calorias" style={{width: 100, height:60}} />
    </div>
    <div className="widget2">
      <h3>Tracking semanal</h3>
      <img src="https://www.zohowebstatic.com/sites/default/files/column-chart.jpg" alt="imagen tracking" style={{width: 100, height: 50}} />
    </div> */}
      <Footer />
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
