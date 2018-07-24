import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux'
import '../styles/LogIn.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      emailError: null,
      passwordError: null,
      open: sessionStorage.getItem("signedUp")? true : false,
      msg: "Account successfully created!"
    };
  }

  componentWillMount() {
    sessionStorage.removeItem("signedUp");
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email === null || this.state.email === "") {
      this.setState({emailError: "Email field cannot be empty"})
    } else {
      this.setState({emailError: null})
    }
    if (this.state.password === null || this.state.password === "") {
      this.setState({passwordError: "Password field cannot be empty"})
    } else {
      this.setState({passwordError: null})
    }
    if (this.state.email !== null && this.state.email !== "" && this.state.password !== null && this.state.password !== "") {
     this.successful();
   }
  }

  logIn(res, type) {
    console.log(res);
    if (type === "facebook" && res.email) {
      sessionStorage.setItem("email", JSON.stringify(res))
      this.props.dispatchLogIn(res.email)
      this.successful();
    } else if (type === "google" && res.w3.U3) {
      sessionStorage.setItem("email", JSON.stringify(res))
      this.props.dispatchLogIn(res.w3.U3)
      this.successful();
    }
  }

  successful() {
    sessionStorage.setItem("logged", true);
    this.props.history.push({
      pathname: "/home"
    })
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

const mapStateToProps = state => (
  {loggedIn : state}
);

const mapDispatchToProps = dispatch => (
  {dispatchLogIn: (userEmail) => dispatch({type: "logging", email: userEmail})}
);  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
