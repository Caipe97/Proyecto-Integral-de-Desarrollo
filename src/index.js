import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './pages/App/App';
import { userDataReducer } from './store/userData/userDataReducer';
import { mealsReducer } from './store/meals/mealsReducer';
import { foodsReducer } from './store/foods/foodsReducer';
import { BrowserRouter } from "react-router-dom";
import './index.css';

const logger = createLogger() 

const rootReducers = combineReducers({userDataReducer, mealsReducer, foodsReducer})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);