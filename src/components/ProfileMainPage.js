import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../pages/Profile/Profile.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarouselContainer from '../components/CarouselContainer';

class ProfileMainPage extends Component{
  
  componentDidMount(){
    this.props.onGetMealsFromUser(this.props.userId)
    this.props.onGetAllFoods();
  }
  render() {
    if(this.props.meals[0]){
      const birthdayString = this.props.birthday.toString().substring(0,10);
      return (
        <div className="contenedorPro">
          <Header {...this.props}/>
          <div className="contenidoPro">
            <div className="search" style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ width: '80%' }}>Search</div>
              <div style={{ width: '10%', }}>
                <button  type="button" className='btn btn--primary btn--s' style={{ fontSize: '9px', backgroundColor:'white'}}  onClick={async () => {  this.props.history.push("/meals"); }}>Agregar Alimento</button>
              </div>
            </div>
            <div className="comida"  style={{borderRadius:'18px'}}>
              <CarouselContainer meals={this.props.meals} history={this.props.history} onDeleteMeal={this.props.onDeleteMeal} onUpdateCurrentMealInState={this.props.onUpdateCurrentMealInState}/>
            </div>
          </div>
          <div className="sidebarPro">
            <div className="col3" style={{ textAlign: 'center' }}>
              <h1 className='f1'>Perfil</h1>
            </div>
            <div className="col1" style={{height:'100%'}}>
              <p>Name: {this.props.name}</p>
              <p>Surname: {this.props.surname}</p>
              <p>Email: {this.props.email}</p>
              <p>Gender: {this.props.gender}</p>
            </div>
            <div className="col2" style={{height:'100%'}}>
              <p>Birthday: {birthdayString}</p>
              <p>Weight: {this.props.weight}</p>
              <p>Height: {this.props.height}</p>
              <Link to="/resetPassword" style={{ color: 'black', marginBottom: '5%' }}>Reset your password</Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else{
      return (
        <div className="contenedorPro">
          <Header userId={this.props.userId} onLogout={this.props.onLogout} history={this.props.history} style={{ background: '#0E4749', paddingTop: '10px', paddingBottom: '10px', top: 0 }}/>

          <div className="contenidoPro" style={{backgroundColor:'#B6E052'}}>
            <div className="search" style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ width: '80%' }}>Search</div>
              <div style={{ width: '10%', }}>
                <button type="button" className='btn btn--primary btn--s' style={{ fontSize: '9px', backgroundColor:'white'}} onClick={async () => { this.props.history.push("/meals"); }}>Agregar Alimento</button>
              </div>
              
            </div>
            <div className="comida" style={{ display: 'flex', justifyContent: 'space-around' }}>
            </div>
          </div>
          <div className="sidebarPro">
            <div className="col3" style={{ textAlign: 'center' }}>
              <h1 className='f1'>Perfil</h1>
            </div>
            <div className="col1" style={{height:'100%'}}>
              <p>Name: {this.props.name}</p>
              <p>Surname: {this.props.surname}</p>
              <p>Email: {this.props.email}</p>
              <p>Gender: {this.props.gender}</p>
              
            </div>
            <div className="col2" style={{height:'100%'}}>
              <p>Birthday: {this.props.birthday}</p>
              <p>Weight: {this.props.weight}</p>
              <p>Height: {this.props.height}</p>
              <Link to="/resetPassword" style={{ color: 'black', marginBottom: '5%' }}>Reset your password</Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    
  }
}

export default ProfileMainPage
