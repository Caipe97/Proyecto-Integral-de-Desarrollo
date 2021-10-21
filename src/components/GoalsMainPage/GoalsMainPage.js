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
      name: '',
      totalCalories: '',
      dateStart: '',
      successMessage: ''
    };
  }

  async componentDidMount(){
    // if(this.props.history.location.state){
    //   await this.setState({
    //     ...this.state,
    //     name: this.props.history.location.state.meal.name,
    //     dateStart: new Date(this.props.history.location.state.meal.dateStart)
    //   })
    // } else {
    //   await this.setState({
    //     ...this.state,
    //     name: 'Comida',
    //     dateStart: ''
    //   });
    //   this.props.onResetCurrentMeal();
    // }   
    await this.setState({
      ...this.state,
      name: '',
      totalCalories: '',
      dateStart: ''
    });
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      successMessage: ''
    })
  };

  changeDateStartFormat = date => {
    if(date){
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      if(month < 10){
        return (year+'-0'+month);
      } else {
        return (year+'-'+month);
      }
    }
    return '';
  }

  objectivesSumedCaloriesIsSmallerOrEqualThanGoalTotalCalories = (goal, totalCalories) => {
    const objectivesTotalCalories = goal.objectives.reduce((totalCalories, objective) => {
      return totalCalories + objective.objectiveCalories
    }, 0)
    if(objectivesTotalCalories > totalCalories){
      return false;
    } else{
      return true;
    }
  }

  handleSubmitCreate = async event => {
    event.preventDefault();
    if(this.objectivesSumedCaloriesIsSmallerOrEqualThanGoalTotalCalories(this.props.currentGoal, this.state.totalCalories)){
      let neccesaryDateStartFormat = this.changeDateStartFormat(this.state.dateStart);
      this.props.onChangeCurrentGoalNameTotalCaloriesAndDateStart(this.state.name, this.state.totalCalories, neccesaryDateStartFormat);
      const data = await this.props.onAddGoal(this.props.userId, this.props.currentGoal);
      if(data.payload.message){
        this.setState({
          ...this.state,
          successMessage: 'Completa todos los campos para cargar una meta'
        })
      } else {
        this.setState({
          ...this.state,
          successMessage: 'Meta agregada exitosamente'
        })
      }
  
      this.setState({name: '', totalCalories: '', dateStart: ''});
      this.props.onResetCurrentGoal();
    } else{
      this.setState({
        ...this.state,
        successMessage: 'La suma de las calorias de los objetivos no puede superar a las colarias totales del mismo'
      })
    }
  };

  handleSubmitUpdate = event => {
    event.preventDefault();
    // const dateStartString = this.state.dateStart.toString().substring(4, 24);
    // this.props.onChangeCurrentGoalNameAndDateStart(this.state.name, dateStartString);
    // this.props.onUpdateCurrentGoal(this.props.currentGoal);
    // this.setState({
    //   ...this.state,
    //   successMessage: 'Comida editada exitosamente'
    // })
    // this.setState({name: 'Comida', dateStart: ''});
    // this.props.onResetCurrentMeal();
  };

  handleChangeDateStart = date => {
    const today = new Date();
    if(Date.parse(date) > Date.parse(today)){
      date = today
    }
    this.setState({
      ...this.state,
      dateStart: date
    })
  };
  
  getFoodCategoryNameOfObjective = (objective) => {
    let categoryName;
    this.props.foodCategories.forEach(foodCategory => {
      if(objective.foodCategoryId === foodCategory.foodCategoryId){
        categoryName = foodCategory.name;
      }
    });
    return categoryName;
  }

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
            <TextField label="Nombre de la meta" name='name' type='name' value={this.state.name} onChange={this.handleChange} required/>
            <TextField label="Calorías de la meta" name='totalCalories' type='totalCalories' value={this.state.totalCalories} onChange={this.handleChange} required/>
            </div>
            <div className="row">
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center' }}>
                <ul style={{ marginBlock: '0em', paddingInlineStart: '1%' }}>
                  {this.props.currentGoal.objectives.map((objective) =>
                    <div key={objective.FoodCategoryId} style={{width:'100%', backgroundColor: '#b6e052', borderRadius: 10, paddingLeft: 4, paddingRight: 2}}>
                      <li style={{listStyleType: 'none',justifyContent:'space-between',display:'flex', marginTop:'10px'}}>
                          <div style={{paddingTop: 7}}>Nombre: {this.getFoodCategoryNameOfObjective(objective)} Objetivo:{objective.objectiveCalories}</div>
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
                  selected={this.state.dateStart}
                  onChange={(date) => this.handleChangeDateStart(date)}
                  dateFormat="dd-MM-yyyy h:mm aa"
                  placeholderText='Fecha de consumo'
                />
              </div>
            </div>
            <button onClick={this.handleSubmitCreate} className='btn btn--primary btn--s' style={{ fontSize: '14px', boxShadow: '0px 4px 4px grey', margin: '10px', backgroundColor:'#E55812', color: 'white' }}>Crear Meta</button>
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
