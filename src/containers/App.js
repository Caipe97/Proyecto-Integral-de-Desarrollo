import React from "react";;

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import ResetPassword from './ResetPassword';

import { Switch, Route } from "react-router-dom";

function App() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile}/>
        </Switch>
      </div>
    );
}

export default App;