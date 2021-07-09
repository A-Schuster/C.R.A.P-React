import * as ActionType from './ActionTypes';

export const UserIssues = (state = {loading: true, issues: []}, action) => {
  switch(action){
    case ActionType.USER_ISSUES_LOADING:
      return {...state, loading: true}
    case ActionType.SHOW_USER_ISSUES:
      const issue = action.payload
      return {...state, loading: false, issues: action.payload}
    default:
      return state;
  }
}