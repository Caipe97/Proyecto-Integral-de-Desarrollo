import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../pages/Profile/Profile.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CarouselContainer from '../CarouselContainer/CarouselContainer';
import avatar from '../../images/avatar.png';
import MealsSearchBar from '../SearchBar/MealsSearchBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Doughnut, Bar } from 'react-chartjs-2';

class ProfileMainPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dateStart: new Date(new Date(new Date().setMonth(new Date().getMonth()-11)).toDateString()),
      dateEnd: new Date(new Date().setDate(new Date().getDate() +1)),
      foodCategoriesWithCalories: [],
      filteredFoodCategories: [],
      checkboxsList: [],
      chartData: {},
      mealsQuantity: 0,
      errorMessage: ''
    };
  }

  async componentDidMount(){
    await this.props.onGetMealsFromUser(this.props.userId);
    await this.props.onGetFoodCategories(this.props.userId);
    await this.props.onGetLastYearsMeals(this.props.userId);
    await this.props.onGetGoalsFromUser(this.props.userId);
    let foodCategoriesWithCaloriesCopy = [...this.state.foodCategoriesWithCalories];
    let checkboxsListCopy = [...this.state.checkboxsList];
    this.props.foodCategories.forEach(foodCategory => {
      foodCategoriesWithCaloriesCopy.push({
        foodCategoryId: foodCategory.foodCategoryId,
        foodCategoryName: foodCategory.name,
        calories: 0
      });
      checkboxsListCopy.push({
        foodCategoryId: foodCategory.foodCategoryId,
        foodCategoryName: foodCategory.name,
        checked: true
      });
    })
    this.setState({
      foodCategoriesWithCalories: foodCategoriesWithCaloriesCopy,
      checkboxsList: checkboxsListCopy,
      mealsQuantity: this.props.meals.length
    })
    this.handleSubmit()
  }

  async componentDidUpdate(){
    if(this.props.meals.length !== this.state.mealsQuantity){
      await this.props.onGetLastYearsMeals(this.props.userId);
      await this.setState({
        mealsQuantity: this.props.meals.length
      })
    }
  }

  handleChangeDateStart = date => {
    const today = new Date();
    if(Date.parse(date) > Date.parse(today)){
      date = today
    }
    this.setState({
      dateStart: date
    })
  };

  handleChangeDateEnd = date => {
    const today = new Date();
    if(Date.parse(date) > Date.parse(today)){
      date = today
    }
    this.setState({
      dateEnd: date
    })
  };

  handleChangeCheckbox = (foodCategoryId) => {
    this.setState({
      checkboxsList: this.state.checkboxsList.map(checkbox => {
        if(checkbox.foodCategoryId === foodCategoryId){
          checkbox.checked = !checkbox.checked
        }
        return(checkbox);
      })
    })
    this.calculateFoodCategoriesPercentages();
  }

  handleSubmit = async event => {
    if(event){
      event.preventDefault();
    }
    
    if(this.validateAll()){
      const dateStartString = this.state.dateStart.toString().substring(4, 15);
      const dateEndString = this.state.dateEnd.toString().substring(4, 15);
      await this.props.onGetMealsByPeriod(this.props.userId, dateStartString, dateEndString);
      this.calculateFoodCategoriesPercentages();
    }
  }

  calculateFoodCategoriesPercentages = async () => {
    //foodCategoriesWithCalories es el arreglo con todas las categorias y sus cantidades
    //inicializacion de los arreglos que utilizo
    await this.setState({ 
      filteredFoodCategories: [] //resultado final con los porcentajes
    });
    let foodCategoriesWithCaloriesCopy = []; //arreglo con las categorias y su contenido calorico filtrado segun los checkboxs
    await this.state.foodCategoriesWithCalories.forEach((foodCategoryWithCalories) => {
      this.state.checkboxsList.forEach(checkbox => {
        if(foodCategoryWithCalories.foodCategoryId === checkbox.foodCategoryId){
          if(checkbox.checked){
            return foodCategoriesWithCaloriesCopy.push(foodCategoryWithCalories);
          }
        }
      });
    })
    await foodCategoriesWithCaloriesCopy.forEach(foodCategoryWithCalories => {
      foodCategoryWithCalories.calories = 0
    });
    //calculo la cantidad de calorias de cada alimento
    await foodCategoriesWithCaloriesCopy.forEach(foodCategoryWithCalories => {
      this.props.mealsByPeriod.forEach(meal => {
        meal.FoodList.forEach(foodAndQuantity => {
          if(foodAndQuantity.food.foodCategoryId === foodCategoryWithCalories.foodCategoryId){
            foodCategoryWithCalories.calories += foodAndQuantity.quantity * foodAndQuantity.food.caloriesPerServing;
          }
        });
      });
    });
    //calculo el total de calorias consumidas
    let totalQuantity = 0;
    await foodCategoriesWithCaloriesCopy.forEach(foodCategory => {
      totalQuantity += foodCategory.calories;
    })
    //calculo el porcentaje de calorias consumidas para cada foodCategory
    let filteredFoodCategoriesCopy = [...this.state.filteredFoodCategories];
    await foodCategoriesWithCaloriesCopy.forEach(foodCategory => {
      filteredFoodCategoriesCopy.push({
        state: foodCategory.foodCategoryName,
        value: foodCategory.calories / totalQuantity * 100
      })
    })
    await this.setState({
      filteredFoodCategories: filteredFoodCategoriesCopy
    })
    let labels = [];
    let datasetsData = [];
    this.state.filteredFoodCategories.forEach(element => {
      labels.push(element.state);
      datasetsData.push(element.value);
    });
    
    this.setState({
      chartData: {
        labels: labels,
        datasets: [
          {
            label: 'Calorias por mes',
            data: datasetsData,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
            ]
          },
        ],
      }
    })
  }

  validateAll = () => {
    return this.validateDate(this.state.dateStart) && this.validateDate(this.state.dateEnd);
  }

  validateDate = (date) => {
    const dateCopy = date.toString();
    return dateCopy !== ''
  }
  render() {

    const birthdayString = this.props.birthday.toString().substring(0,10);
      return (
        <div className="contenedorPro">
          <Header {...this.props}/>
          <div className="contenidoPro">
            <div className="comida">
              <MealsSearchBar {...this.props}/>
            </div>
          </div>
          <div className="dashboardPro">
            <div className="col1" style={{ display: "flex", flexDirection: "column", textAlign: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <p>Porcentaje calórico por Categoría</p>
              <div style={{alignSelf: 'center', width: "100%",height: "100%", alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <Doughnut data={this.state.chartData} options={{plugins: {legend: {display: true}}, labels: {display: false}, responsive: true, maintainAspectRatio: false}} />
              </div>
            </div>
            <div className="col3" style={{ textAlign: 'center'}}>
            <p>Búsqueda por fecha</p>
          
              <form>
              <div style={{paddingLeft: "20%",display: 'flex', justifyContent: 'center', textAlign: 'start', alignItems: 'center', alignContent: 'center'}}>
                Desde:
                <DatePicker
                  name='date'
                  selected={this.state.dateStart}
                  onChange={(date) => this.handleChangeDateStart(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText='Fecha de inicio'
                  style={{float: 'left'}}
                />
                </div>
                <div style={{paddingLeft: "21.2%", display: 'flex', justifyContent: 'center', textAlign: 'start', alignItems: 'center', alignContent: 'center'}}>
                Hasta:
                  <DatePicker
                  name='date'
                  selected={this.state.dateEnd}
                  onChange={(date) => this.handleChangeDateEnd(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText='Fecha de finalización'
                  style={{float: 'left', marginLeft: "20px"}}
                  />
                </div>
                <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', textAlign: 'start', alignItems: 'center', alignContent: 'center'}}>
                  <button onClick={this.handleSubmit} className='button'>Buscar comidas</button>
                  {this.props.isPending
                  ? <div className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </div>
                  : null}
                </div>
                {
                  (typeof this.state.chartData.datasets) === 'undefined'
                  ? null
                  : (Number.isNaN(this.state.chartData.datasets[0].data[0])) === true
                    ? <p>No se encontraron alimentos en ese período</p>
                    : null
                }
              </form>
              <p>Filtros</p>
              <FormGroup >
              {
                this.state.checkboxsList.map((checkbox) => {
                  return(
                      <FormControlLabel key={checkbox.foodCategoryId} control={
                        <Checkbox
                          checked={checkbox.checked}
                          onChange={() => this.handleChangeCheckbox(checkbox.foodCategoryId)}
                        />
                      } label={checkbox.foodCategoryName} />

                  )
                })
              }
              </FormGroup>
            </div>
            <div className="col2" style={{minHeight: 400,display: "flex", flexDirection: "column",textAlign: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <p>Consumo calórico mensual</p>
              <div style={{ alignSelf: 'center', width: "90%",minHeight: 300, height: "100%", alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>

              
              <Bar data={this.props.lastYearsMeals} options={{plugins: {legend: {display: false}}, responsive: true, maintainAspectRatio: false}} />
              </div>
            </div>
            <div className="col4" style={{}}>
            <div className="comidaa"  style={{borderRadius:'18px'}}>
              <p>Historial de Metas</p>
                <CarouselContainer userId={this.props.userId} goals={this.props.goals} history={this.props.history} onDeleteGoal={this.props.onDeleteGoal} onUpdateCurrentGoalInState={this.props.onUpdateCurrentGoalInState} onGetGoalsFromUser={this.props.onGetGoalsFromUser}/> 
            </div>
              
            </div>
          </div>
          <div className="sidebarPro">
            <div className="col3" style={{ textAlign: 'center'}}>
              <h1 className='f1' style={{color: 'rgb(0, 38, 38)', fontFamily: 'Arial'}}>Perfil <img alt="profile" src={avatar} style={{width: 50}}/></h1>
            </div>
            <div className="col1" style={{height:'100%'}}>
            <p>Nombre: {this.props.name}</p>
              <p>Apellido: {this.props.surname}</p>
              <p>Email: {this.props.email}</p>
              <p>Genero: {this.props.gender}</p>
              
            </div>
            <div className="col2" style={{height:'100%'}}>
              <p>Fecha de Nacimiento: {birthdayString}</p>
              <p>Peso: {this.props.weight}</p>
              <p>Altura: {this.props.height}</p>
              <Link to="/resetPassword" style={{ color: 'black', marginBottom: '5%' }}>Cambia tu contraseña</Link>
            </div>
          </div>
          
          
          <Footer />
        </div>
      );
  }
}
export default ProfileMainPage
