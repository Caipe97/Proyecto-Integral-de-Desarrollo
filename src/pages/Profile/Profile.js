import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
// import '../App/App.css';
import './Profile.css';
//import logo1 from '../../images/analystic.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMealsFromUser } from '../../store/meals/mealsActions';
import { getAllFoods } from'../../store/foods/foodsActions';
import { logout } from '../../store/userData/userDataActions';
import CarouselContainer from '../../components/CarouselContainer';

const mapStateToProps = (state) => {
  return {
    userId: state.userDataReducer.userId,
    name: state.userDataReducer.name,
    surname: state.userDataReducer.surname,
    email: state.userDataReducer.email,
    password: state.userDataReducer.password,
    gender: state.userDataReducer.gender,
    birthday: state.userDataReducer.birthday,
    weight: state.userDataReducer.weight,
    height: state.userDataReducer.height,
    isPending: state.userDataReducer.isPending,
    meals: state.mealsReducer.meals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMealsFromUser: (userId) => dispatch(getMealsFromUser(userId)),
    onGetAllFoods: () => dispatch(getAllFoods()),
    onLogout: () => dispatch(logout())
  }
}

function Profile(props) {
  let history = useHistory();
  useEffect(() => {
    props.onGetMealsFromUser(props.userId)
  }, []);
  if(props.meals[0]){
    return (
      <div className="contenedorPro">
        <Header userId={props.userId} onLogout={props.onLogout} history={history}/>

        <div className="contenidoPro">
          <div className="search" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '80%' }}>Search</div>
            <div style={{ width: '10%', }}>
              <button  type="button" className='btn btn--primary btn--s' style={{ fontSize: '9px', backgroundColor:'white'}}  onClick={async () => { await props.onGetAllFoods(); history.push("/meals"); }}>Agregar Alimento</button>
            </div>
          </div>
          <div className="comida"  style={{borderRadius:'18px'}}
          // style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            {/* {props.meals.map((meal) =>
                <div key={meal.mealId}>
                    <p>{meal.name}</p>   
                    <p>{meal.dateEaten}</p>
                    {meal.FoodList.map((FoodListItem) => {
                      return(
                        <div key={FoodListItem.food.foodId}>
                          <p>{FoodListItem.quantity} {FoodListItem.food.name}</p>
                        </div>
                      )
                    })}
                </div>
            )} */}
            {/* ACA COLOCAR CARUSELL */}
            <CarouselContainer meals={props.meals} history={history}/>
          </div>
        </div>
        <div className="sidebarPro">
          {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}> */}
          <div className="col3" style={{ textAlign: 'center' }}>
            <h1 className='f1'>Perfil</h1>
          </div>
          <div className="col1" style={{height:'100%'}}>
            <p>Name: {props.name}</p>
            <p>Surname: {props.surname}</p>
            <p>Email: {props.email}</p>
            <p>Gender: {props.gender}</p>
            
          </div>
          <div className="col2" style={{height:'100%'}}>
            <p>Birthday: {props.birthday}</p>
            <p>Weight: {props.weight}</p>
            <p>Height: {props.height}</p>
            <Link to="/resetPassword" style={{ color: 'black', marginBottom: '5%' }}>Reset your password</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else{
    return (
      <div className="contenedorPro">
        <Header userId={props.userId} onLogout={props.onLogout} history={history} style={{ background: '#0E4749', paddingTop: '10px', paddingBottom: '10px', top: 0 }}/>

        <div className="contenidoPro" style={{backgroundColor:'#B6E052'}}>
          <div className="search" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '80%' }}>Search</div>
            <div style={{ width: '10%', }}>
              <button type="button" className='btn btn--primary btn--s' style={{ fontSize: '9px', backgroundColor:'white'}} onClick={async () => { await props.onGetAllFoods(); history.push("/meals"); }}>Agregar Alimento</button>
            </div>
            
          </div>
          <div className="comida" style={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* {props.meals.map((meal) =>
                <div key={meal.mealId}>
                    <p>{meal.name}</p>   
                    <p>{meal.dateEaten}</p>
                    {meal.FoodList.map((FoodListItem) => {
                      return(
                        <div key={FoodListItem.food.foodId}>
                          <p>{FoodListItem.quantity} {FoodListItem.food.name}</p>
                        </div>
                      )
                    })}
                </div>
            )} */}
          </div>
        </div>
        <div className="sidebarPro">
          {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}> */}
          <div className="col3" style={{ textAlign: 'center' }}>
            <h1 className='f1'>Perfil</h1>
          </div>
          <div className="col1" style={{height:'100%'}}>
            <p>Name: {props.name}</p>
            <p>Surname: {props.surname}</p>
            <p>Email: {props.email}</p>
            <p>Gender: {props.gender}</p>
            
          </div>
          <div className="col2" style={{height:'100%'}}>
            <p>Birthday: {props.birthday}</p>
            <p>Weight: {props.weight}</p>
            <p>Height: {props.height}</p>
            <Link to="/resetPassword" style={{ color: 'black', marginBottom: '5%' }}>Reset your password</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
