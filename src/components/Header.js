import React, { Component } from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { NavLink } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import '../styles/Header.css';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      open : false,
      loggedIn : sessionStorage.getItem("email")? true : false  
    }
  }

  logOut() {
    this.props.dispatchLogOut();
    this.setState({open: true});
    sessionStorage.clear();
  }

  render() {
    const navStyle = {
      textDecoration: "none",
      position: "relative",
      fontSize: "20px",
      fontFamily: "times",
      color: "black",
      lineHeight: "56px",
      marginRight: "15px",
      cursor: "pointer"
    };

    const iconStyle = {
      textDecoration: "none",
      color: "black",
      paddingRight: "15px",
      cursor: "pointer",
      position: "absolute",
      left: "-35px",
      bottom: "-4px"
    };

    const loggedOut = (
      <div>
        <NavLink style={navStyle} to="/log-in"> Log In </NavLink> 
        <NavLink style={navStyle}  to="/sign-up"> Sign Up </NavLink>
      </div>
    );

    const loggedIn = (
      <div>
        <NavLink style={navStyle} to="/log-in"> 
          <i style={iconStyle} className="material-icons md-29"> 
             account_circle 
          </i>
           {sessionStorage.getItem("email")? JSON.parse(sessionStorage.getItem("email")).name : null}
        </NavLink>
        <NavLink style={navStyle} to="/" onClick={()=> this.logOut()}> Log Out </NavLink>
      </div>
    );
    return (
      <MuiThemeProvider>
        <div>
        <AppBar
          title={
            <NavLink style={{textDecoration: "none", fontSize: "30px", cursor: "pointer", color: "white"}}
              to={"/"}>
              Fake Yelp Website
            </NavLink>
          }
          iconElementRight={this.props.loggedIn.isLogged.loggedIn || sessionStorage.getItem("email") ? loggedIn : loggedOut }
          showMenuIconButton={false}
        />
        <Snackbar
          open={this.state.open}
          message={"Successfully logged out"}
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
  {dispatchLogOut: () => dispatch({type: "loggingOut"})}
);  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

