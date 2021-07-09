import * as ActionTypes from './ActionTypes';

export const Users = (state = {errMess: null, users: []}, action) => {
  switch(action.type){
    case ActionTypes.LOAD_USERS:
      return {...state, errMess: null, users: action.payload}
    case ActionTypes.ADD_USER:
      const users = action.payload;
      return {...state, users: state.users.concat(users)}
    default:
      return state;
  }
}

export const CurrentUser = (state = {errMess: null, currentUser: {
      username: "",
      password: "",
      role: "",
      email: ""
}}, action) => {
  switch(action.type){
    case ActionTypes.LOGIN_USER:
      return {...state, errMess: null, currentUser: action.payload}
    case ActionTypes.LOG_OUT:
      return {...state, errMess: null, currentUser: {
      username: "",
      password: "",
      role: "",
      email: ""
    }}
    default:
      return state;
  }
}