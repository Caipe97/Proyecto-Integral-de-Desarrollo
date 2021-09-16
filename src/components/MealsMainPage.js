import React, { Component } from 'react';
import '../pages/Meals/Meals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import DatePicker from "react-datepicker";
import TextField from '@material-ui/core/TextField';

class MealsMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Comida',
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
    const dateEatenString = this.state.dateEaten.toString().substring(4, 24);
    this.props.currentMeal.name = this.state.name;
    this.props.currentMeal.dateEaten = dateEatenString;
    this.props.onAddMeal(this.props.userId, this.props.currentMeal);
    this.setState({name: 'Comida', dateEaten: ''});
    this.props.onResetCurrentMeal();
  };

  handleChangeDateEaten = date => {
    this.setState({
      ...this.state,
      dateEaten: date
    })
  };

  render() {
    console.log(this.props)
    return (
      <div className="contenedorR">
        <Header userId={this.props.userId} onLogout={this.props.onLogout} history={this.props.history}/>
        <button type="button" onClick={() => this.props.history.push("/profile")}>Go to Profile</button>
        <div className='contenidoR'>
          <div className="col2R">
           <SearchBar {...this.props} meal={this.props.currentMeal}/>
          </div>
        </div>
        <div className="sidebarR">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: 45 }}>
              <TextField label="Nombre de la comida" name='name' type='name' value={this.state.name} onChange={this.handleChange} required/>
            </div>
            <div className="row">
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center' }}>
                <ul style={{ marginBlock: '0em', paddingInlineStart: '1%' }}>
                  {this.props.currentMeal.FoodList.map((foodAndQuantity) =>
                    <div key={foodAndQuantity.food.foodId}>
                      <li>{foodAndQuantity.quantity} x {foodAndQuantity.food.name} <button type="button" onClick={() => this.props.onRemoveFoodFromCurrentMeal(foodAndQuantity)}>Delete</button></li>
                    </div>
                  )}
                </ul>
              </div>
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center' }}>
                <DatePicker
                  showTimeSelect
                  name='fecha consumo'
                  selected={this.state.dateEaten}
                  onChange={(date) => this.handleChangeDateEaten(date)}
                  dateFormat="dd-MM-yyyy h:mm aa"
                  placeholderText='Fecha de consumo'
                />
              </div>
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
