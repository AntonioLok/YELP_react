const LogIn = (state={loggedIn: false, email: ""}, action) => {
  switch(action.type) {
    case "logging":
      return ({
          loggedIn: true, 
          email: action.email
        }) ;
    case "loggingOut":
      return ({
          loggedIn: false, 
          email: ""
        }) ;
    default:
      return state;
  }
}

export default LogIn;