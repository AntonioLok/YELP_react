import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      open : false,
      loggedIn : sessionStorage.getItem("email")? true : false  
    }
  }

  componentWillMount() {
    alert("HI");
  }

  logOut() {
    this.setState({loggedIn: false, open: true});
    sessionStorage.clear();
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
        <FlatButton label="Log-Out" style={buttonStyle} onClick={()=> this.logOut()}/>
      </div>
    );


    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title={
              <a style={{textDecoration: "none", fontSize: "30px", cursor: "pointer", color: "white"}}
                href={"/home"}>
                Fake Yelp Website
              </a>
            }
            iconElementRight={this.state.loggedIn? loggedIn : loggedOut }
            showMenuIconButton={false}
          />
          <Snackbar
            open={this.state.open}
            message={"Successfully logged out"}
            autoHideDuration={2000}
            style={{textAlign: "center"}}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
