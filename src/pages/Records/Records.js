import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addRecord } from '../../store/actions';
import { useHistory } from "react-router-dom";
import FormInput from '../../components/FormInput';
import '../App/App.css';
import logo1 from '../../images/avatar.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const mapStateToProps = (state) => {
  return {
    id: state.userDataReducer.id,
    records: state.recordsReducer.records,
    isPending: state.recordsReducer.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddRecord: (id, foodName, gramAmount, dateEaten) => dispatch(addRecord(id, foodName, gramAmount, dateEaten))
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
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onAddRecord(props.id,state.foodName, state.gramAmount, state.dateEaten);
    setState({foodName: '', gramAmount: '', dateEaten: ''});
  };
  
  console.log(props)

  return (
    <div className="contenedor">
      <Header/>
      <ul>
        {props.records.map((record) => 
          <div style={{backgroundColor: 'white', width: '100%', marginBottom: '1%', listStyleType: 'none'}}>
            <li key={record.foodName}>{record.foodName}</li>
          </div>
        )}
      </ul>
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="box" style={{}}>
            <img src={logo1} alt="imagen tracking" style={{ width: 100 }} />
          </div>
          <div style={{ marginTop: 45 }}>
            <h1 className='f1'>Records</h1>
          </div>

          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <FormInput name='foodName' type='foodName' placeholder='foodName' handleChange={handleChange} required />
            <FormInput name='gramAmount' type='gramAmount' placeholder='gramAmount' handleChange={handleChange} required />
            <FormInput name='dateEaten' type='date' placeholder='dateEaten' handleChange={handleChange} required />
          </form>
          <button onClick={handleSubmit} style={{margin: '10px'}}>Records</button>
          <button type="button" onClick={() => history.push("/profile")}>Go to Profile</button>
        </div>
      </div>

      <Footer/>
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Records)
