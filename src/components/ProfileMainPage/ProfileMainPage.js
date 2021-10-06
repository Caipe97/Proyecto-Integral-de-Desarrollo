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
      dateStart: '',
      dateEnd: '',
      foodCategoriesWithCalories: [],
      filteredFoodCategories: [],
      checkboxsList: [],
      chartData: {},
      errorMessage: ''
    };
  }

  async componentDidMount(){
    await this.props.onGetMealsFromUser(this.props.userId);
    await this.props.onGetFoodCategories(this.props.userId);
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
      checkboxsList: checkboxsListCopy
    })
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
    event.preventDefault();
    if(this.validateAll()){
      const dateStartString = this.state.dateStart.toString().substring(4, 15);
      const dateEndString = this.state.dateEnd.toString().substring(4, 15);
      await this.props.onGetMealsByPeriod(this.props.userId, dateStartString, dateEndString);
      this.setState({dateStart: '', dateEnd: ''});
      this.calculateFoodCategoriesPercentages();
    }
  }

  calculateFoodCategoriesPercentages = async () => {
    //foodCategoriesWithCalories es el arreglo con todas las categorias y sus cantidades
    //inicializacion de los arreglos que utilizo
    await this.setState({ 
      filteredFoodCategories: [] //resultado final con los porcentajes
    });
    console.log('Deberia estar vacio: ', this.state.filteredFoodCategories);
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
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
            ],
            borderColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
            ],
            borderWidth: 1,
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
    console.log(this.state.data)
    if(this.props.meals[0]){
      return (
        <div className="contenedorPro">
          <Header {...this.props}/>
          <div className="contenidoPro">
            <h1 style={{color: 'rgb(0, 38, 38)', fontFamily: 'Arial', fontSize: 30}}>Comidas</h1>
            <div className="search" style={{ display: 'flex', justifyContent: 'space-around'}}>
                <button  type="button" className='btn btn--primary btn--s' style={{ boxShadow: '0px 4px 4px grey', backgroundColor:'#f5f6f7', color: 'black', fontSize: '11px', height: 30}}  onClick={async () => {  this.props.history.push("/meals"); }}>Agregar Comida</button>
            </div>
            <div className="comida"  style={{borderRadius:'18px'}}>
              <CarouselContainer meals={this.props.meals} history={this.props.history} onDeleteMeal={this.props.onDeleteMeal} onUpdateCurrentMealInState={this.props.onUpdateCurrentMealInState}/>
              <MealsSearchBar {...this.props}/>
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
          <div>
            <form>
              <DatePicker
                showTimeSelect
                name='date'
                selected={this.state.dateStart}
                onChange={(date) => this.handleChangeDateStart(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText='Fecha de inicio'
              />
              <DatePicker
                showTimeSelect
                name='date'
                selected={this.state.dateEnd}
                onChange={(date) => this.handleChangeDateEnd(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText='Fecha de finalización'
              />
              <button onClick={this.handleSubmit} className='button'>Buscar comidas</button>
              <p>{this.state.errorMessage}</p>
            </form>
            <Doughnut data={this.state.chartData}/>
            <Bar data={this.state.chartData}/>
            <p>Filtros</p>
            {
              this.state.checkboxsList.map((checkbox) => {
                return(
                  <FormGroup key={checkbox.foodCategoryId}>
                    <FormControlLabel control={
                      <Checkbox
                        checked={checkbox.checked}
                        onChange={() => this.handleChangeCheckbox(checkbox.foodCategoryId)}
                      />
                    } label={checkbox.foodCategoryName} />
                  </FormGroup>
                )
              })
            }
          </div>
          <Footer />
        </div>
      );
    } else{
      return (
        <div className="contenedorPro">
          <Header {...this.props}/>
          <div className="contenidoPro">
            <h1 style={{color: 'rgb(0, 38, 38)', fontFamily: 'Arial', fontSize: 30}}>Comidas</h1>
            <div className="search" style={{ display: 'flex', justifyContent: 'space-around'}}>
                <button  type="button" className='btn btn--primary btn--s' style={{ boxShadow: '0px 4px 4px grey', backgroundColor:'#f5f6f7', color: 'black', fontSize: '11px', height: 30}}  onClick={async () => {  this.props.history.push("/meals"); }}>Agregar Comida</button>
            </div>
            <div className="comida"  style={{borderRadius:'18px', textAlign: 'center'}}>
              <MealsSearchBar {...this.props}/>
              {/* <p style={{marginTop: 20}}>Usted no ha cargado ninguna comida</p> */}
            </div>
          </div>
          <div className="sidebarPro">
            <div className="col3" style={{ textAlign: 'center' }}>
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
            <form>
              <DatePicker
                showTimeSelect
                name='date'
                selected={this.state.dateStart}
                onChange={(date) => this.handleChangeDateStart(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText='Fecha de inicio'
              />
              <DatePicker
                showTimeSelect
                name='date'
                selected={this.state.dateEnd}
                onChange={(date) => this.handleChangeDateEnd(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText='Fecha de finalización'
              />
              <button onClick={this.handleSubmit} className='button'>Buscar comidas</button>
              <p>{this.state.errorMessage}</p>
            </form>
            <Doughnut data={this.state.chartData}/>
            <Bar data={this.state.chartData}/>
            <p>Filtros</p>
            {
              this.state.checkboxsList.map((checkbox) => {
                return(
                  <FormGroup key={checkbox.foodCategoryId}>
                    <FormControlLabel control={
                      <Checkbox
                        checked={checkbox.checked}
                        onChange={() => this.handleChangeCheckbox(checkbox.foodCategoryId)}
                      />
                    } label={checkbox.foodCategoryName} />
                  </FormGroup>
                )
              })
            }
          <Footer />
        </div>
      );
    }
    
  }
}

export default ProfileMainPage
