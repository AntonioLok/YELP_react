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
    if (this.state.userName === null || this.state.userName === "") {
      this.setState({userNameError: "User field cannot be empty"});
    } else {
      this.setState({userNameError: null});
    }
    if (this.state.email === null || this.state.email === "") {
      this.setState({emailError: "Email field cannot be empty"});
    } else {
      this.setState({emailError: null}); 
    }
    if (this.state.password === null || this.state.password === "") {
      this.setState({passwordError: "Password field cannot be empty"})
    } else {
      this.setState({passwordError: null});
    }
    if (this.state.rePassword === null || this.state.rePassword === "") {
      this.setState({rePasswordError: "Re-Password field cannot be empty"})
    } else if (this.state.password !== this.state.rePassword &&
              this.state.password !== null && this.state.password !== "") {
      this.setState({passwordError: "Passwords do not match",
                    rePasswordError: "Passwords do not match"});
    } else {
      this.setState({rePasswordError: null});
    }

    if (this.state.userName !== null && this.state.userName !== "" &&
        this.state.email !== null && this.state.email !== "" &&
        this.state.password !== null && this.state.password !== "" &&
        this.state.password === this.state.rePassword
      ) {
      sessionStorage.setItem("signedUp", true);
      this.props.history.push({
        pathname: "/log-in"
      });
    }
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
