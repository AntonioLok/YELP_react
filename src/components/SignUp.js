import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/SignUp.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      email: null,
      password: null,
      rePassword: null,
      userNameError: null,
      emailError: null,
      passwordError: null,
      rePasswordError: null,
    };
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.userName === null) {
      this.setState({userNameError: "User field cannot be empty"})
    }
    if (this.state.email === null) {
      this.setState({emailError: "Email field cannot be empty"})
    }
    if (this.state.password === null) {
      this.setState({passwordError: "Password field cannot be empty"})
    }
    if (this.state.password !== this.state.rePassword) {
      this.setState({rePasswordError: "Passwords do not match"})
    }
  
    this.props.history.push({
      pathname: "/log-in",
      state: true
    });
  }

  render() {

    const form = (
    <form id="sign-up" onSubmit={(event) => this.handleSubmit(event)}>
      <h2> Sign Up </h2>
      <TextField 
        floatingLabelText="Username"
        name="userName"
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.userNameError}
      /><br />
      <TextField
        floatingLabelText="Email"
        name="email"
        type="email"
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.emailError}
      /><br />
      <TextField
        floatingLabelText="Password"
        name="password"
        type="password"
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.passwordError}
      /><br />
      <TextField
        floatingLabelText="Re-enter Password"
        name="rePassword"
        type="password"
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.rePasswordError}
      /><br />
      <RaisedButton label="Sign Up" primary={true}
        style={{marginTop: "40px", width: "30%"}}
        type="submit"
      />
      
  </form>
    );

    return (
      <MuiThemeProvider>
        {form}
      </MuiThemeProvider>
    );
  }
}

export default Schedule;
