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
      <Header userId={props.id} onLogout={props.onLogout} history={history}/>

      <div className="contenidoPro">
        {/* <h1>Contenido</h1> */}
        <div className="search" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '80%' }}>Search</div>
          <div style={{ width: '10%', }} >
            <button style={{ fontSize: '10px', }} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Agregar Alimento</button>

          </div>

</div>
        <div className="comida" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '30%' }}>
            <div className="row">
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>ComidaOne</div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>
                <p>AlimentoDos</p>
                <p>...</p>
              </div>
              <div className="w-100" ></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>Fecha</div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>
                <button style={{ fontSize: '10px', }} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Edit</button>
                <button style={{ fontSize: '10px', }} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Remove</button>

              </div>
            </div>
          </div>
          <div style={{ width: '30%' }}>
            <div className="row">
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>ComidaTwo</div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>
                <p>AlimentoTres</p>
                <p>...</p>
              </div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>Fecha</div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>
                <button style={{ fontSize: '10px', }} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Edit</button>
                <button style={{ fontSize: '10px', }} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Remove</button>
              </div>
            </div>
          </div>
          <div style={{ width: '30%' }}>
            <div className="row">
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>ComidaThree</div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>
                <p>AlimentoDos</p>
                <p>...</p>
              </div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>Fecha</div>
              <div className="w-100"></div>
              <div className="col" style={{ border: '1px solid black', textAlign: 'center' }}>
                <button style={{ fontSize: '10px', }} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Edit</button>
                <button style={{ fontSize: '10px', }} type="button" onClick={() => { props.onGetRecordsFromUser(props.id); history.push("/records") }}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebarPro">
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}> */}
        <div className="col3" style={{ textAlign: 'center' }}>
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
