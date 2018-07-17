import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import '../styles/App.css';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
    console.log(date);
  };

  render() {

    const form = (
    <div id="formContainer">
      <h2> Booking Form </h2>
    <TextField
      floatingLabelText="Full Name"
    /><br />
    <TextField
      floatingLabelText="Phone Number"
    /><br />
    <DatePicker
      hintText="Controlled Date Input"
      value={this.state.controlledDate}
      onChange={this.handleChange}
    />
    {this.state.controlledDate + ""}    
  </div>
    );

    return (
      <MuiThemeProvider>
        {form}
      </MuiThemeProvider>
    );
  }
}

export default Schedule;
