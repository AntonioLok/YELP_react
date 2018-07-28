import React, { Component } from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { NavLink } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import '../styles/Header.css';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      open : false,
      loggedIn : sessionStorage.getItem("user")? true : false  
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
      color: "white",
      lineHeight: "56px",
      cursor: "pointer",
      padding: "20px 15px 20px 15px"
    };

    const iconStyle = {
      position: "relative",
      left: "-10px",
      bottom: "-7px",
    };

    const loggedOut = (
      <div id="nav">
        <NavLink id="nav" style={navStyle}  to="/log-in"> Log In </NavLink> 
        <NavLink id="nav" style={navStyle}  to="/sign-up"> Sign Up </NavLink>
      </div>
    );

    const loggedIn = (
      <div id="nav">
        <NavLink style={navStyle} 
        to={"/profile/" + (JSON.parse(sessionStorage.getItem("user"))? JSON.parse(sessionStorage.getItem("user"))._id : null)}>
          <i style={iconStyle} className="material-icons md-29"> 
             account_circle 
          </i>
           {sessionStorage.getItem("user")? 
            JSON.parse(sessionStorage.getItem("user")).name + " " +
            JSON.parse(sessionStorage.getItem("user")).lastName : null}
        </NavLink>
        <NavLink id="nav" style={navStyle} to="/" onClick={()=> this.logOut()}> Log Out </NavLink>
      </div>
    );
    return (
      <MuiThemeProvider>
        <div id="header-container">
        <AppBar
          title={
            <NavLink style={{textDecoration: "none", fontSize: "30px", cursor: "pointer", color: "white"}}
              to={"/"}>
              Fake Yelp Website
            </NavLink>
          }
          style={{backgroundColor: "#993366", height: "70px"}}
          iconElementRight={this.props.loggedIn.isLogged.loggedIn || sessionStorage.getItem("user") ? loggedIn : loggedOut }
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

