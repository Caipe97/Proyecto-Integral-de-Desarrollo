import React from "react";

import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ResetPassword from '../ResetPassword/ResetPassword';
import Records from '../Records/Records';

import { Switch, Route } from "react-router-dom";

function App() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/records" component={Records}/>
        </Switch>
      </div>
    );
}

export default App;