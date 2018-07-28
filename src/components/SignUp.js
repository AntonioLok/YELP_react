import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { register } from './../register';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/SignUp.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      lastName : null,
      email: null,
      password: null,
      rePassword: null,
      nameError: null,
      lastNameError: null,
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
    if (this.state.name === null || this.state.name === "") {
      this.setState({nameError: "Name field cannot be empty"});
    } else {
      this.setState({nameError: null});
    }
    if (this.state.lastName === null || this.state.lastName === "") {
      this.setState({lastNameError: "Last Name field cannot be empty"});
    } else {
      this.setState({lastNameError: null});
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

    if (this.state.name !== null && this.state.name !== "" &&
        this.state.lastName !== null && this.state.lastName !== "" &&
        this.state.email !== null && this.state.email !== "" &&
        this.state.password !== null && this.state.password !== "" &&
        this.state.password === this.state.rePassword
      ) {
        var user = {username: this.state.email, name: this.state.name, lastName: this.state.lastName, password: this.state.password}
        register(user).then(data => {
          if (data.success === false) {
            this.setState({emailError : "Account already exists"});
          } else {
            sessionStorage.setItem("signedUp", true);
            this.props.history.push({
              pathname: "/log-in"
            });
          }
      });
    }
  }

  render() {
    const form = (
    <form id="sign-up" onSubmit={(event) => this.handleSubmit(event)}>
      <h2> Sign Up </h2>
      <TextField 
        floatingLabelText="Name"
        name="name"
        floatingLabelStyle={{color: "purple"}}
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.nameError}
      /><br />
      <TextField 
        floatingLabelText="Last Name"
        name="lastName"
        floatingLabelStyle={{color: "purple"}}
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.lastNameError}
      /><br />
      <TextField
        floatingLabelText="Email"
        name="email"
        type="email"
        floatingLabelStyle={{color: "purple"}}
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.emailError}
      /><br />
      <TextField
        floatingLabelText="Password"
        name="password"
        type="password"
        floatingLabelStyle={{color: "purple"}}
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.passwordError}
      /><br />
      <TextField
        floatingLabelText="Re-enter Password"
        name="rePassword"
        type="password"
        floatingLabelStyle={{color: "purple"}}
        onChange={(event) => this.handleChange(event)}
        errorText={this.state.rePasswordError}
      /><br />
      <button 
          type="submit"
        > Sign Up
      </button>
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
