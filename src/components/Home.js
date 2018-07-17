import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ToolbarGroup from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import '../styles/Home.css';  

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: this.props.location.state? true : false,
      msg: null
    }
  }

  componentWillMount() {
    this.setState({msg : this.getMessage()}, () => {
      this.props.history.push({
        pathname: "/home",
        state: false
      });
    });
  }

  getMessage() {
    if (this.props.location.state === "signup") {
      return "Account Created!"
    } else if (this.props.location.state === "login") {
      return "Successfully logged in!"
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="home-container">
          <TextField
            floatingLabelText="Full Name"
          /><br />
          <TextField
            floatingLabelText="Full Name"
          /><br />
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

export default Home;
