import React, { Component } from 'react';
import Home from './Home'
import SignUp from './SignUp'
import LogIn from './LogIn'
import Header from './Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect : null
    }
  }
  
  render() {  

    return (
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/home" component={ Home } />
            <Route exact path="/sign-up" component={ SignUp } />
            <Route exact path="/log-in" component={ LogIn } />
          </Switch>
        </div>
      </Router>
    );

  }
}

export default App;
