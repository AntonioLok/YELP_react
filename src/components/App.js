import React, { Component } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Header from './Header';
import Search from './Search';
import Profile from './Profile';
import Review from './Review';
import ProfilePic from './ProfilePic';
import EditProfile from './EditProfile';
import WriteReview from './WriteReview';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect : null,
      loggedIn : null
    }
  }

  componentWillMount() {
    this.setState({loggedIn : sessionStorage.getItem("user")? true : false});
  }
  
  render() { 
    return (
      <Router>
        <div id="container">
          <Header />
            <div id="main-body">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/sign-up" component={ SignUp } />
                <Route exact path="/log-in" component={ LogIn } />
                <Route exact path="/search/:term/:location/:offset" component={ Search } />
                <Route exact path="/profile/:id" component={ Profile } />
                <Route exact path="/profile/:id/edit" component={ EditProfile } />
                <Route exact path="/profile/:id/edit/profilepic" component={ ProfilePic } />
                <Route exact path="/business/:name" component={ Review } />
                <Route exact path="/business/:name/writeReview" component={ WriteReview } />
              </Switch>
            </div>
        </div>
      </Router>
    );

  }
}

export default App;
