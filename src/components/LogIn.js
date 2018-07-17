import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/LogIn.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      emailError: null,
      passwordError: null
    };
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email === null) {
      this.setState({emailError: "Email field cannot be empty"})
    }
    if (this.state.password === null) {
      this.setState({passwordError: "Password field cannot be empty"})
    }

    this.props.history.push({
      pathname: "/home",
      state: "login"
    });
  }

  render() {

    const form = (
    <form id="log-in" onSubmit={(event) => this.handleSubmit(event)}>
      <h2> Log In </h2>
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
      <RaisedButton label="Log In" primary={true}
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
