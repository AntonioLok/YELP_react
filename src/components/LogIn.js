import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Snackbar from 'material-ui/Snackbar';
import '../styles/LogIn.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      emailError: null,
      passwordError: null,
      open: this.props.location.state? true : false,
      msg: "Account successfully created!"
    };
  }

  componentWillMount() {
    this.props.history.push({
      pathname: "/log-in",
      state: false
    });
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
      state: true
    });
  }

  logIn(res, type) {
    if (type === "facebook" && res.email) {
      sessionStorage.setItem("email", JSON.stringify(res.email))
      this.props.history.push({
        pathname: "/home",
        state: true
      });
    } else if (type === "google" && res.w3.U3) {
      sessionStorage.setItem("email", JSON.stringify(res.w3.U3))
      this.props.history.push({
        pathname: "/home",
        state: true
      });
    }
  }

  render() {

    const responseFacebook = (response) => {
      this.logIn(response, "facebook")
    }

    const responseGoogle = (response) => {
      this.logIn(response, "google")
    } 

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

  const FBform = (
    <div id="fb-loggin">
      <FacebookLogin
        appId="2059503744290725"
        autoLoad={false}
        fields="name,email,picture"
        callback={(responseFacebook)} 
        cssClass="fb-button"
        icon="fa-facebook"
      />
    </div>
  );

  const Googleform = (
    <div id="google-loggin">
      <GoogleLogin
        clientId="1092156889921-ssb0vgemfhmhaftm2qr2ogd2794adkac.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        className="google-button"
        >
        <i className="fa fa-google-plus" style={{ marginRight: "8px"}}/> 
        <span>Login with Google</span>  
      </GoogleLogin>
    </div>

  );

    return (
      <MuiThemeProvider>
        <div id="login-container">
          {form}
          <div id="fb-google">
           {FBform} {Googleform}
          </div>

          <Snackbar
              open={this.state.open}
              message={this.state.msg}
              autoHideDuration={2000}
              style={{textAlign: "center"}}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Schedule;
