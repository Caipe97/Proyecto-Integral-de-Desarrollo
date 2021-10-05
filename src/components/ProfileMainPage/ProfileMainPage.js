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
import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTooltip,
} from "@progress/kendo-react-charts";
import "@progress/kendo-theme-material/dist/all.css";

// Graph data
const applicationsStatusThisMonth = [
  {
    status: "Accepted",
    value: 14,
    color: 'green',
  },
  {
    status: "Interviewing",
    value: 14,
    color: 'yellow',
  },
  {
    status: "Rejected",
    value: 40,
    color: 'red',
  },
  {
    status: "Pending",
    value: 32,
    color: 'black',
  },
];

// Show category label for each item in the donut graph
const labelContent = e => e.dataItem.state;

const renderTooltip = context => {
  const { dataItem, value } = context.point || context;
  return (
    <div>
      {dataItem.state}: {Math.round(value)}%
    </div>
  );
};

class ProfileMainPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dateStart: '',
      dateEnd: '',
      foodCategoriesWithQuantities: [],
      filteredFoodCategories: [],
      errorMessage: ''
    };
  }

  async componentDidMount(){
    await this.props.onGetMealsFromUser(this.props.userId);
    await this.props.onGetFoodCategories(this.props.userId);
    this.props.foodCategories.forEach(foodCategory => {
      this.state.foodCategoriesWithQuantities.push({
        foodCategoryId: foodCategory.foodCategoryId,
        foodCategoryName: foodCategory.name,
        quantity: 0
      })
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

  handleSubmit = async event => {
    this.state.filteredFoodCategories = [];
    this.state.foodCategoriesWithQuantities.forEach(foodCategoryWithQuantity => {
      foodCategoryWithQuantity.quantity = 0
    });
    event.preventDefault();
    if(this.validateAll()){
      const dateStartString = this.state.dateStart.toString().substring(4, 15);
      const dateEndString = this.state.dateEnd.toString().substring(4, 15);
      await this.props.onGetMealsByPeriod(this.props.userId, dateStartString, dateEndString);
      this.state.foodCategoriesWithQuantities.forEach(foodCategory => {
        this.props.mealsByPeriod.forEach(meal => {
          meal.FoodList.forEach(foodAndQuantity => {
            if(foodAndQuantity.food.foodCategoryId === foodCategory.foodCategoryId){
              foodCategory.quantity += foodAndQuantity.quantity;
            }
          });
        });
      });
      let totalQuantity = 0;
      this.state.foodCategoriesWithQuantities.forEach(foodCategory => {
        totalQuantity += foodCategory.quantity;
      })
      this.state.foodCategoriesWithQuantities.forEach(foodCategory => {
        this.state.filteredFoodCategories.push({
          state: foodCategory.foodCategoryName,
          value: foodCategory.quantity / totalQuantity * 100
        })
      })
      console.log(this.state.foodCategoriesWithQuantities);
      // this.setState({dateStart: '', dateEnd: ''});
    }
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
            <Chart>
              <ChartTitle text="Applications status - this month"/>
              <ChartLegend visible={false}/>
              <ChartTooltip render={renderTooltip} />
              <ChartSeries>
                <ChartSeriesItem
                  type="donut"
                  data={this.state.filteredFoodCategories}
                  categoryField="status"
                  field="value"
                  
                >
                  <ChartSeriesLabels
                    color="#fff"
                    background="none"
                    content={labelContent}
                  />
                </ChartSeriesItem>
              </ChartSeries>
            </Chart>
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
          <Footer />
        </div>
      );
    }
    
  }
}

export default ProfileMainPage
