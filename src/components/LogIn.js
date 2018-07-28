import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { register } from './../register';
import '../styles/LogIn.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      error: null,
      emailError: null,
      passwordError: null,
      msg: "Account successfully created!"
    };
  }

  componentDidMount() {
    sessionStorage.removeItem("signedUp");
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({error: null});
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
      this.signIn(null, "nonSocialMedia");
   }
  }

  signIn(res, type) {
    let user;
    if (type === "facebook" && res.email) {
      user = {username: res.email, name: res.name.split(" ")[0], lastName: res.name.split(" ")[1]}
    } else if (type === "google" && res.w3.U3) {
      user = {username: res.w3.U3, name: res.w3.ofa, lastName: res.w3.wea};
    } else if (type === "nonSocialMedia") {
      user = {username: this.state.email}
    }
    this.logInHelper(user, type);
  }

  logInHelper(user, type) {
    if (type === "nonSocialMedia") {
      this.logIn(this.state.email, this.state.password)
        .then(data => {
          if (data.success === false) {
            this.setState({error: data.message});
          } else {
            user.name = data.user.name;
            user.lastName = data.user.lastName;
            //sessionStorage.setItem("user", JSON.stringify(user));
            //this.props.dispatchLogIn(user.username);
            this.successful(user.username);
          }
        });
    } else {
      register(user);
      //sessionStorage.setItem("user", JSON.stringify(user));
      //this.props.dispatchLogIn(user.username);
      this.successful(user.username);
    }
  }

  successful(email) {
    this.getUserInfo(email).then(data => {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("logged", true);
      this.props.dispatchLogIn(email);
      this.props.history.push({
        pathname: "/home"
      })
    });
  }

  async logIn(userUsername, userPassword) {
    return await fetch('http://localhost:8000/api/log-in', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userUsername,
        password: userPassword,
      })
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error(`Could not fetch data`);
      }
      return response.json()}
    ).catch((error) => {
      console.log("Request failed", error);
    })
  };

  async getUserInfo(email) {
    return await fetch('http://localhost:8000/api/profile/' + email, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error(`Could not fetch data`);
      }
      return response.json();
    })
    .catch((error) => {
      console.log("Request failed", error);
    })
  }
  

  render() {

    const responseFacebook = (response) => {
      this.signIn(response, "facebook")
    }

    const responseGoogle = (response) => {
      this.signIn(response, "google")
    } 

    const form = (
      <form id="log-in" onSubmit={(event) => this.handleSubmit(event)}>
        <h2> Log In </h2>
        <TextField
          floatingLabelText="Email"
          floatingLabelStyle={{color: "purple"}}
          name="email"
          type="email"
          onChange={(event) => this.handleChange(event)}
          errorText={this.state.emailError}
        /><br />
        <TextField
          floatingLabelText="Password"
          floatingLabelStyle={{color: "purple"}}
          name="password"
          type="password"
          onChange={(event) => this.handleChange(event)}
          errorText={this.state.passwordError}
        /><br />
        <button 
          type="submit"
        > Log In
        </button>
        <div style={{color: "red", marginTop: "30px"}}>
          {this.state.error? "Error: " + this.state.error : null} 
        </div>
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
            open={sessionStorage.getItem("signedUp") ? true : false}
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