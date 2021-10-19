import React, { Component } from 'react';
import '../../pages/Goals/Goals.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FoodCategoriesSearchBar from '../SearchBar/FoodCategoriesSearchBar';
import DatePicker from "react-datepicker";
import TextField from '@material-ui/core/TextField';
// import GoalModal from '../Modal/GoalModal';
// import Delete from '../../images/delete.png'
// import Meal from '../../images/meal.png';

class GoalsMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Meta',
      dateEaten: '',
      successMessage: ''
    };
  }

  async componentDidMount(){
    // if(this.props.history.location.state){
    //   await this.setState({
    //     ...this.state,
    //     name: this.props.history.location.state.meal.name,
    //     dateEaten: new Date(this.props.history.location.state.meal.dateEaten)
    //   })
    // } else {
    //   await this.setState({
    //     ...this.state,
    //     name: 'Comida',
    //     dateEaten: ''
    //   });
    //   this.props.onResetCurrentMeal();
    // }   
    await this.setState({
      ...this.state,
      name: 'Meta',
      dateEaten: ''
    });
  }

  handleChange = event => {
    // this.setState({
    //   ...this.state,
    //   [event.target.name]: event.target.value,
    //   successMessage: ''
    // })
  };

  handleSubmitCreate = async event => {
    event.preventDefault();
    // const dateEatenString = this.state.dateEaten.toString().substring(4, 24);
    // this.props.onChangeCurrentMealNameAndDateEaten(this.state.name, dateEatenString);
    // const data = await this.props.onAddMeal(this.props.userId, this.props.currentMeal);
    // if(data.payload.message){
    //   this.setState({
    //     ...this.state,
    //     successMessage: 'Completa todos los campos para cargar una comida'
    //   })
    // } else {
    //   this.setState({
    //     ...this.state,
    //     successMessage: 'Comida agregada exitosamente'
    //   })
    // }

    // this.setState({name: 'Comida', dateEaten: ''});
    // this.props.onResetCurrentMeal();
  };

  handleSubmitUpdate = event => {
    event.preventDefault();
    // const dateEatenString = this.state.dateEaten.toString().substring(4, 24);
    // this.props.onChangeCurrentMealNameAndDateEaten(this.state.name, dateEatenString);
    // this.props.onUpdateCurrentMeal(this.props.currentMeal);
    // this.setState({
    //   ...this.state,
    //   successMessage: 'Comida editada exitosamente'
    // })
    // this.setState({name: 'Comida', dateEaten: ''});
    // this.props.onResetCurrentMeal();
  };

  handleChangeDateEaten = date => {
    // const today = new Date();
    // if(Date.parse(date) > Date.parse(today)){
    //   date = today
    // }
    // this.setState({
    //   ...this.state,
    //   dateEaten: date
    // })
  };
  
  render() {
    return (
      <div className="contenedorR">
        <Header {...this.props}/>
        <div className='contenidoR' style={{backgroundColor:'#B6E052'}}>
          <div className="col2R" >
            <FoodCategoriesSearchBar {...this.props}/>
            {/* <CustomFoodModal onAddCustomFood={this.props.onAddCustomFood} edit={false} userId={this.props.userId} foodCategories={this.props.foodCategories}/> */}
          </div>
        </div>
        <div className="sidebarR" >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: 45 }}>
              <TextField label="Nombre de la comida" name='name' type='name' value={this.state.name} onChange={this.handleChange} required/>
            </div>
            <div className="row">
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center' }}>
                <ul style={{ marginBlock: '0em', paddingInlineStart: '1%' }}>
                  {this.props.currentGoal.objectives.map((objective) =>
                    <div key={objective.FoodCategoryId} style={{width:'100%', backgroundColor: '#b6e052', borderRadius: 10, paddingLeft: 4, paddingRight: 2}}>
                      <li style={{listStyleType: 'none',justifyContent:'space-between',display:'flex', marginTop:'10px'}}>
                          <div style={{paddingTop: 7}}>Nombre: {objective.foodCategory.foodCategoryName} Objetivo:{objective.objectiveCalories} Actualmente:{objective.currentCalories}</div>
                          <div><img src={"https://cdn.discordapp.com/attachments/776636063673876500/890637232275324969/trash_negro.png"} alt="tacho" style={{width: 18, margin: 10, borderRadius: 2, cursor: 'pointer'}} onClick={() => this.props.onRemoveObjectiveFromCurrentGoal(objective)}/></div>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center',marginTop:'15px' }}>
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
            <button onClick={this.handleSubmitUpdate} className='btn btn--primary btn--s' style={{ fontSize: '14px', boxShadow: '0px 4px 4px grey', margin: '10px', backgroundColor:'#E55812', color: 'white' }}>Editar Comida</button>
            <p>{this.state.successMessage}</p>
            <button type="button" onClick={() => this.props.history.push("/profile")} style={{marginTop: '10%'}}>Volver al Perfil</button>
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default GoalsMainPage
