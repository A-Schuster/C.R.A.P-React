import * as ActionTypes from './ActionTypes';

export const CustomerIssues = (state = {loading: true, errMess: null, issues: []}, action) => {
  switch(action.type){
    case ActionTypes.ADD_ISSUES:
      return {...state, errMess: null, issues: action.payload, loading: false}
    case ActionTypes.ADD_ISSUE:
      const issue = action.payload;
      return {...state, issues: state.issues.concat(issue)}
    case ActionTypes.ISSUES_LOADING:
      return {...state, loading: true, issues: [], errMess: null}
    default:
      return state;
  }
}