import * as ActionTypes from './ActionTypes';

export const CustomerIssues = (state = {errMess: null, issues: []}, action) => {
  switch(action.type){
    case ActionTypes.ADD_ISSUES:
      return {...state, errMess: null, issues: action.payload}
    case ActionTypes.ADD_ISSUE:
      const issue = action.payload;
      return {...state, issues: state.issues.concat(issue)}
    default:
      return state;
  }
}