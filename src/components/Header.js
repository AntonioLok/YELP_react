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
      fontSize: "20px",
      fontFamily: "times",
      color: "black",
      lineHeight: "56px",
      marginRight: "15px",
      cursor: "pointer"
    };

    const loggedOut = (
      <div>
        <NavLink style={navStyle} to="/log-in"> Log In </NavLink> 
        <NavLink style={navStyle}  to="/sign-up"> Sign Up </NavLink>
      </div>
    );

    const loggedIn = (
      <div>
        <div style={navStyle} onClick={()=> this.logOut()}> Log Out </div>
      </div>
    );
    {console.log(this.props.loggedIn)}
    return (
      <div>

        <MuiThemeProvider>
          <AppBar
            title={
              <NavLink style={{textDecoration: "none", fontSize: "30px", cursor: "pointer", color: "white"}}
                to={"/home"}>
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
        </MuiThemeProvider>
      </div>
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

