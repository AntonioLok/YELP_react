import { combineReducers } from 'redux'
import LogIn from './LogIn'

const rootReducer = combineReducers({
  isLogged: LogIn
});

export default rootReducer;