import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addRecord, deleteRecord } from '../../store/records/recordsActions';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import './Records.css';
// import logo1 from '../../images/avatar.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { logout } from '../../store/userData/userDataActions';
import SearchBar from '../../components/SearchBar';

const mapStateToProps = (state) => {
  return {
    id: state.userDataReducer.id,
    records: state.recordsReducer.records,
    isPending: state.recordsReducer.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddRecord: (id, foodName, gramAmount, dateEaten) => dispatch(addRecord(id, foodName, gramAmount, dateEaten)),
    onDeleteRecord: (id) => dispatch(deleteRecord(id)),
    onLogout: () => dispatch(logout())
  }
}

function Records(props) {
  let [state, setState] = useState({
    foodName: '',
    gramAmount: '',
    dateEaten: ''
  });

  let history = useHistory();

  const handleChange = event => {
    console.log(event);
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onAddRecord(props.id, state.foodName, state.gramAmount, state.dateEaten);
    setState({ foodName: '', gramAmount: '', dateEaten: '' });
  };

  return (
    <div className="contenedorR">
      <Header userId={props.id} onLogout={props.onLogout} history={history}/>
      <button type="button" onClick={() => history.push("/profile")}>Go to Profile</button>
      <div className='contenidoR'>
        <div className="col1R" style={{background:'grey',height:'20%'}}>
            <p>Search</p>
        </div>
        <div className="col2R">
          <ul style={{ marginBlock: '0em', paddingInlineStart: '1%' }}>
            {props.records.map((record) =>
              <div key={record.id} style={{ display: 'flex', backgroundColor: 'white', width: '100%', listStyleType: 'none', marginTop: '2%', padding: '2% 0.5%', border: '2px solid grey', borderRadius: 10, height: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <li>Alimento: {record.foodName}, gramos: {record.gramAmount}, fecha en que fue comido: {record.dateEaten.substring(0, 10)}</li>
                <button type="button" onClick={() => props.onDeleteRecord(record.id)}>Delete</button>
              </div>
            )}
          </ul>
          {/* <SearchBar/> */}
        </div>

      </div>


      <div className="sidebarR">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="box">
            {/* <img src={logo1} alt="imagen tracking" style={{ width: 100 }} />
  */}         </div>
          <div style={{ marginTop: 45 }}>
            <h1 className='f1'>Comida One</h1>
          </div>
          <p>AlimentoOne x3<button type="button" onClick={() => history.push("/profile")}>-</button>
            
          </p>
          <p>AlimentoFour x1<button type="button" onClick={() => history.push("/profile")}>-</button></p>
          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <TextField name='foodName' type='foodName' placeholder='foodName' value={state.foodName} onChange={handleChange} required />
            <TextField name='gramAmount' type='gramAmount' placeholder='gramAmount' value={state.gramAmount} onChange={handleChange} required />
            <TextField name='dateEaten' type='date' placeholder='dateEaten' value={state.dateEaten} onChange={handleChange} required />
          </form>
          <button onClick={handleSubmit} style={{ margin: '10px' }}>Cargar Comida</button>
          
        </div>
      </div>

      <Footer />
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Records)
