import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { NavLink } from 'react-router-dom';
import { getProfilePicture } from './../getProfilePicture';
import Snackbar from 'material-ui/Snackbar';
import '../styles/Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: null,
      userInfo: JSON.parse(sessionStorage.getItem("user")),
      loaded: false
    };
  }

  componentDidMount() {
    getProfilePicture(JSON.parse(sessionStorage.getItem("user")).profilePicture).then((data) => {
      this.setState({profilePic: data.img, loaded: true});
      sessionStorage.removeItem("updated");
    })
  };

  render() {

    const about = []
      for (var i=0; i < this.state.userInfo.about.split("\n").length; i++) {
        about.push(<div id="info" key={i}> {this.state.userInfo.about.split("\n")[i]} </div>)
      }

    const top = (
      <div id="top">
        <div style={{width: "600px", display: "flex", justifyContent: "space-between"}}>
          <div id="profile-img">
          {this.state.profilePic === null? 
            <img src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"/> :
            <img src={"data:image/jpeg;base64," + this.state.profilePic.data} />
          }
          <button  id="add-photo" 
            onClick={
              ()=> this.props.history.push(this.props.location.pathname + ((this.props.location.pathname.slice(-1) === '/')? "" : "/") + "edit/profilepic")
            }
            >
            <i className="material-icons" style={{position: "absolute", bottom: "3px", left: "15px"}}>
              photo_camera
            </i>
              Add/Change Pic
            </button>
          </div>
          <div id="fullname"> {this.state.userInfo.name + " " + this.state.userInfo.lastName} </div> 
        </div>
        <div>
        <NavLink id="edit-btn" 
          to={this.props.location.pathname + ((this.props.location.pathname.slice(-1) === '/')? "" : "/")  + "edit"}>
            Edit Profile 
        </NavLink>
        </div>
      </div>
    );

    const bottom = (
      <div id="bottom">
        <div id="about">
          <div> About {this.state.userInfo.name + " " + this.state.userInfo.lastName}: </div>
          <div id="subtitle"> Joined since: </div>
          <div id="info"> {this.state.userInfo.dateJoined + ": "} </div>
          {this.state.userInfo.location !== null && this.state.userInfo.location !==""?
            <div>
              <div id="subtitle"> From: </div>
              <div id="info"> {this.state.userInfo.location} </div>
            </div> : null
          }
          {this.state.userInfo.about !== null && this.state.userInfo.about !==""?
            <div>
              <div id="subtitle"> About me: </div>
              <div id="info"> {about} </div>
            </div> : null
          }
          {this.state.userInfo.blog !== null && this.state.userInfo.blog !==""?
            <div>
              <div id="subtitle"> Blog/Social Media link: </div>
              <div id="info"> {this.state.userInfo.blog} </div>
            </div> : null
          }
          {this.state.userInfo.favoMovie !== null && this.state.userInfo.favoMovie !== ""?
            <div>
              <div id="subtitle"> Favorite Movie: </div>
              <div id="info"> {this.state.userInfo.favoMovie} </div>
            </div> : null
          }
        </div>

        <div id="activity-container"> 
          <div> Recent Activity </div>
          {this.state.userInfo.activity.length !== 0?
            <div id="activity"> All user activities: </div>
            : <div id="activity"> We don't have any recent activity for you right now. </div>
          }
        </div>
      </div>
    );

    return (     
      <MuiThemeProvider>
        <div id="profile-container">
          <Snackbar
            open={sessionStorage.getItem("updated") ? true : false}
            message={sessionStorage.getItem("updated")? sessionStorage.getItem("updated") : ""}
            autoHideDuration={2000}
            style={{textAlign: "center"}}
          />
          {this.state.loaded?
          <div>
            {top}
            {bottom}
            </div>
            : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Profile;
