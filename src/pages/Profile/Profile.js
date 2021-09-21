import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMealsFromUser } from '../../store/meals/mealsActions';
import { getAllFoods } from'../../store/foods/foodsActions';
import { logout } from '../../store/userData/userDataActions';
import ProfileMainPage from '../../components/ProfileMainPage';

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

class Profile extends Component{
  render() {
    return (
      <ProfileMainPage {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
