import React, { Component } from 'react';
import Home from './Home'
import SignUp from './SignUp'
import LogIn from './LogIn'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : true,
      loggedIn : true,
      redirect : null
    }
  }
  
  render() {
    const buttonStyle = {
      height: "50px",
      color: 'black',
      marginTop: "10px"
    };

    const loggedOut = (
      <div>
        <FlatButton label="Log-In" style={buttonStyle} href={"/log-in"}/>
        <FlatButton label="Sign-Up" style={buttonStyle}  href={"/sign-up"}/>
      </div>
    );

    const loggedIn = (
      <div>
        <FlatButton label="Log-Out" style={buttonStyle} href={"/log-in"}/>
      </div>
    );

    return (
      <Router>
        <div className="container">
          <MuiThemeProvider>
            <AppBar
              title={
                <a style={{textDecoration: "none", fontSize: "30px", cursor: "pointer", color: "white"}}
                  href={"/home"}>
                  Fake Yelp Website
                </a>
              }
              iconElementRight={this.state.loggedIn? loggedOut : loggedIn }
              showMenuIconButton={false}
            />
          </MuiThemeProvider>
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
