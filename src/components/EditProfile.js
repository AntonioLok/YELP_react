import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { NavLink } from 'react-router-dom'
import { updateUserInfo } from './../updateUserInfo';
import { getProfilePicture } from './../getProfilePicture';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SaveIcon from '@material-ui/icons/Save';
import '../styles/EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id : JSON.parse(sessionStorage.getItem("user"))._id,
      name: JSON.parse(sessionStorage.getItem("user")).name,
      lastName: JSON.parse(sessionStorage.getItem("user")).lastName,
      location: JSON.parse(sessionStorage.getItem("user")).location,
      about: JSON.parse(sessionStorage.getItem("user")).about,
      blog: JSON.parse(sessionStorage.getItem("user")).blog,
      favoMovie: JSON.parse(sessionStorage.getItem("user")).favoMovie,
      profilePic: null,
      loaded: false
    };
  }

  componentDidMount() {
    getProfilePicture(JSON.parse(sessionStorage.getItem("user")).profilePicture).then((data) => {
      this.setState({profilePic: data.img, loaded: true});
    })
  };

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {... this.state}
    delete (user.profilePic);
    delete (user.loaded);
    updateUserInfo(user).then(data => {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("updated", data.message)
      this.props.history.push({
        pathname: "./"
      })
    });
  }

  render() {
    const form = (
      <form id="edit-container" onSubmit={(event) => this.handleSubmit(event)}>
        <h2> Edit Profile </h2>
          <div style={{position: "relative"}}>
            {this.state.profilePic === null? 
              <img src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"/> :
              <img src={"data:image/jpeg;base64," + this.state.profilePic.data} />
            }
          </div>
          <div> 
            <h1> Current Profile Picture </h1> 
            <NavLink style={{color: "blue"}}
                to={this.props.location.pathname + ((this.props.location.pathname.slice(-1) === '/')? "" : "/")  + "profilepic"}>
              Change it here 
            </NavLink> 
          </div>
          <TextField
            required
            floatingLabelText="Name"
            floatingLabelStyle={{color: "purple"}}
            name="name"
            defaultValue={this.state.name? this.state.name : null}
            onChange={(event) => this.handleChange(event)}
          /><br />
          <TextField
            required
            floatingLabelText="Last Name"
            floatingLabelStyle={{color: "purple"}}
            name="lastName"
            defaultValue={this.state.lastName? this.state.lastName : null}
            onChange={(event) => this.handleChange(event)}
          /><br />
          <TextField
            floatingLabelText="Current Location"
            name="location"
            floatingLabelStyle={{color: "purple"}}
            defaultValue={this.state.location? this.state.location : null}
            onChange={(event) => this.handleChange(event)}
          /><br />
          <TextField
            floatingLabelText="About you"
            floatingLabelStyle={{color: "purple", left: "0px"}}
            name="about"
            id="textarea"
            multiLine={true}
            rows={3}
            defaultValue={this.state.about? this.state.about : null}
            onChange={(event) => this.handleChange(event)}
          /><br />
          <TextField
            floatingLabelText="Blog/Social media URL:"
            floatingLabelStyle={{color: "purple"}}
            name="blog"
            defaultValue={this.state.blog? this.state.blog : null}
            onChange={(event) => this.handleChange(event)}
          /><br />
          <TextField
            floatingLabelText="What is your favorite movie"
            floatingLabelStyle={{color: "purple"}}
            name="favoMovie"
            defaultValue={this.state.favoMovie? this.state.favoMovie : null}
            onChange={(event) => this.handleChange(event)}
          /><br />
          
          <button 
            type="submit"
            disabled={this.state.disable}
            style={{width: "150px", position: "relative", paddingLeft: "30px"}}
          > <SaveIcon style={{position: "absolute", left: "10px", top: "5px"}}/> Save Changes
          </button>
      </form>
    );

    return (
      <div>
        <MuiThemeProvider>
          {
            this.state.loaded? form : null
          }
        </MuiThemeProvider>
      </div>
    );
  }
}

export default EditProfile;
