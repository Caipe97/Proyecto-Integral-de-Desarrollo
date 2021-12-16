import React, { Component } from 'react';
import '../../pages/Goals/Goals.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FoodCategoriesSearchBar from '../SearchBar/FoodCategoriesSearchBar';
import DatePicker from "react-datepicker";
import TextField from '@material-ui/core/TextField';
import Goal from '../../images/goal.png';
import Delete from '../../images/delete.png'

class GoalsMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      totalCalories: '',
      dateStart: new Date(),
      dateStartOrigin: new Date(),
      successMessage: ''
    };
  }

  async componentDidMount(){
    if(this.props.userId === 0){
      await this.props.onRefreshPage();
      this.props.history.push("/profile");
    }
    if(this.props.history.location.state){
      let copyDateStart = new Date(this.props.history.location.state.goal.dateStart)
      let sumThreeHoursToDateStart = copyDateStart.setHours(copyDateStart.getHours() + 3)
      await this.setState({
        ...this.state,
        name: this.props.history.location.state.goal.name,
        totalCalories: this.props.history.location.state.goal.totalCalories,
        dateStart: sumThreeHoursToDateStart,
        dateStartOrigin: new Date(sumThreeHoursToDateStart)
      })
    } else {
      this.props.onResetCurrentGoal();
    }  
  }

  validateQuantity = (quantity) => {//cannot be empty and only numbers
    const expression = /^\d+$/
    return (quantity === '' || expression.test(String(quantity).toLowerCase()))
  }

  handleChangeName = async event => {
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      successMessage: ''
    }) 
  }

  handleChangeCalories = async event => {
    if(this.validateQuantity(event.target.value)){
      await this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
        successMessage: ''
      })
    } else {
      await this.setState({quantity: ''})
    }
  };

  changeDateStartFormat = date => {
    date = new Date(date)
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
    if(this.state.totalCalories !== 0){
      const objectivesTotalCalories = goal.objectives.reduce((totalCalories, objective) => {
        return totalCalories + objective.objectiveCalories
      }, 0)
      if(objectivesTotalCalories > totalCalories){
        return false;
      } else{
        return true;
      }
    } else {
      if(goal.objectives.length === 0){
        return false;
      }
      return true;
    }
  }

  handleSubmitCreate = async event => {
    event.preventDefault();
    if(this.state.totalCalories === ''){
      await this.setState({
        ...this.state,
        totalCalories: 0
      })
    }
    if(this.objectivesSumedCaloriesIsSmallerOrEqualThanGoalTotalCalories(this.props.currentGoal, this.state.totalCalories)){
      if(this.isValidDate(this.state.dateStart, false)){
        if(this.state.name !== ''){
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
          this.setState({name: '', totalCalories: '', dateStart: '', dateStartOrigin: ''});
          this.props.onResetCurrentGoal();
        } else {
          this.setState({
            ...this.state,
            successMessage: 'La meta debe tener un nombre'
          })
        }
      } else {
        this.setState({
          ...this.state,
          successMessage: 'Fecha invalida'
        })
      }
    } else{
      this.setState({
        ...this.state,
        successMessage: 'La suma de las calorias de los objetivos no puede superar a las calorias totales de la meta'
      })
    }
  };

  isValidDate = (date, isEdit) => {
    let isValidDate = true;
    let dateCopy = date.getMonth() + '' + date.getFullYear();
    this.props.goals.forEach(goal => {
      let goalDateStartCopy = new Date(new Date(goal.dateStart).setHours(new Date(goal.dateStart).getHours() + 3))
      goalDateStartCopy = goalDateStartCopy.getMonth() + '' + goalDateStartCopy.getFullYear();
      if(goalDateStartCopy === dateCopy){
        let dateStarCopy = new Date(this.state.dateStartOrigin);
        dateStarCopy = dateStarCopy.getMonth() + '' + dateStarCopy.getFullYear()
        if(isEdit){
          if(goalDateStartCopy !== dateStarCopy){
            isValidDate = false;
            return isValidDate;
          }
        } else {
          isValidDate = false;
          return isValidDate;
        }
      } 
    })
    return isValidDate
  }

  handleSubmitUpdate = async event => {
    event.preventDefault();
    if(this.state.totalCalories === ''){
      await this.setState({
        ...this.state,
        totalCalories: 0
      })
    }
    if(this.objectivesSumedCaloriesIsSmallerOrEqualThanGoalTotalCalories(this.props.currentGoal, this.state.totalCalories)){
      if(this.isValidDate(new Date(this.state.dateStart), true)){
        let neccesaryDateStartFormat = this.changeDateStartFormat(this.state.dateStart);
        this.props.onChangeCurrentGoalNameTotalCaloriesAndDateStart(this.state.name, this.state.totalCalories, neccesaryDateStartFormat);
        const data = await this.props.onUpdateCurrentGoal(this.props.userId, this.props.currentGoal);
        if(data.payload.message){
          this.setState({
            ...this.state,
            successMessage: 'Completa todos los campos para editar una meta'
          })
        } else {
          this.setState({
            ...this.state,
            successMessage: 'Meta editada exitosamente'
          })
        }
        this.setState({name: '', totalCalories: '', dateStart: '', dateStartOrigin: ''});
        this.props.onResetCurrentGoal();
      } else {
        this.setState({
          ...this.state,
          successMessage: 'Fecha invalida'
        })
      }
    } else{
      this.setState({
        ...this.state,
        successMessage: 'La suma de las calorias de los objetivos no puede superar a las colarias totales de la meta'
      })
    }
  };

  handleChangeDateStart = date => {
    const today = new Date();
    if(date < today){
      date = today;
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
          <div className="col2R">
            <FoodCategoriesSearchBar {...this.props}/>
          </div>
        </div>
        <div className="sidebarR" >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={Goal} alt="goal" style={{width: 100}}/>
            <div style={{ marginTop: 15 }}>
            <TextField label="Nombre de la meta" name='name' type='name' value={this.state.name} onChange={this.handleChangeName} required/>
            <TextField label="Calorías de la meta" name='totalCalories' type='totalCalories' value={this.state.totalCalories} onChange={this.handleChangeCalories} required/>
            </div>
            <div className="row">
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center' }}>
                <ul style={{ marginBlock: '0em', paddingInlineStart: '1%' }}>
                  {this.props.currentGoal.objectives.map((objective) =>
                    <div key={objective.foodCategoryId} style={{width:'100%', backgroundColor: '#b6e052', borderRadius: 10, paddingLeft: 4, paddingRight: 2}}>
                      <li style={{listStyleType: 'none',justifyContent:'space-between',display:'flex', marginTop:'10px'}}>
                          <div style={{paddingTop: 7}}>Nombre: {this.getFoodCategoryNameOfObjective(objective)} Objetivo:{objective.objectiveCalories}</div>
                          <div><img src={Delete} alt="tacho" style={{width: 18, margin: 10, borderRadius: 2, cursor: 'pointer'}} onClick={() => this.props.onRemoveObjectiveFromCurrentGoal(objective)}/></div>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
              <div className="w-100"></div>
              <div className="col" style={{ textAlign: 'center',marginTop:'15px' }}>
                <DatePicker
                  name='fecha consumo'
                  selected={this.state.dateStart}
                  onChange={(date) => this.handleChangeDateStart(date)}
                  dateFormat="MM-yyyy"
                  placeholderText='Fecha de consumo'
                  showMonthYearPicker
                />
              </div>
            </div>
            {this.props.history.location.state 
            ? <button onClick={this.handleSubmitUpdate} className='btn btn--primary btn--s' style={{ fontSize: '14px', boxShadow: '0px 4px 4px grey', margin: '10px', backgroundColor:'#E55812', color: 'white' }}>Editar Meta</button>
            : <button onClick={this.handleSubmitCreate} className='btn btn--primary btn--s' style={{ fontSize: '14px', boxShadow: '0px 4px 4px grey', margin: '10px', backgroundColor:'#E55812', color: 'white' }}>Crear Meta</button>
            }
            <p>{this.state.successMessage}</p>
            {this.props.isPending
              ? <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              : null}
            <button type="button" onClick={() => {this.props.history.push("/profile"); this.props.onResetCurrentGoal()}} style={{marginTop: '10%'}}>Volver al Perfil</button>
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default GoalsMainPage
