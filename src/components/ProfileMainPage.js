import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../pages/Profile/Profile.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarouselContainer from '../components/CarouselContainer';
import avatar from '../images/avatar.png';

class ProfileMainPage extends Component{
  
  componentDidMount(){
    this.props.onGetMealsFromUser(this.props.userId)
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
            <p style={{marginTop: 20}}>Usted no ha cargado ninguna comida</p>
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
