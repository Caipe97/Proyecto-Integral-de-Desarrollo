import React, { Component } from 'react';
import '../pages/Meals/Meals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

class MealsMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: '',
      gramAmount: '',
      dateEaten: ''
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddMeal(this.props.userId, this.state.foodName, this.state.gramAmount, this.state.dateEaten);
    this.setState({ foodName: '', gramAmount: '', dateEaten: '' });
  };

  render() {
    return (
      <div className="contenedorR">
        <Header userId={this.props.userId} onLogout={this.props.onLogout} history={this.props.history}/>
        <button type="button" onClick={() => this.props.history.push("/profile")}>Go to Profile</button>
        <div className='contenidoR'>
          <div className="col2R">
           <SearchBar {...this.props}/>
          </div>
        </div>
        <div className="sidebarR">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: 45 }}>
              <h1 className='f1'>Comida One</h1>
            </div>
            <div className="row">
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center' }}>
                <p>AlimentoDosx3  <button style={{ fontSize: '10px', }} type="button" onClick={() => { this.props.history.push("/meals") }}> - </button></p>
                <p>AlimentoOnex3  <button style={{ fontSize: '10px', }} type="button" onClick={() => { this.props.history.push("/meals") }}> - </button></p>
                <p>...</p>
              </div>
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center' }}>Fecha</div>
            </div>
            <button onClick={this.handleSubmit} style={{ margin: '10px' }}>Cargar Comida</button>
          </div>
        </div>
        <Footer />
      </div >
  
    );
  }
}

export default MealsMainPage
