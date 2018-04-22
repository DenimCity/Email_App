import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './styledcomponents/NavBar'
import  HomePage from './components/HomePage'
import  Login from './components/Login'
import  Register from './components/Register'
import Profile from './components/Profile'
class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/login/:email" component={Profile}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
