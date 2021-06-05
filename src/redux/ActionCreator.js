import * as ActionTypes from './ActionTypes';
import baseUrl from "../shared/baseUrl";

export const fetchReviews = () => dispatch => {
  dispatch(reviewsLoading())
  return fetch()
}

export const reviewsLoading = () => ({
  type: ActionTypes.REVIEWS_LOADING,
})

export const fetchIssues = () => dispatch => {
  dispatch(issuesLoading())
  return fetch(baseUrl + "customerissues")
  .then(response => {
    console.log(response)
    if(response.ok){
      return response
    }
    else{
      const error = new Error(`Error ${response.status}: ${response.statusText}`)
      error.response = response;
      throw error
    }
  },
  error => {
    const errMess = new Error(error.message);
    throw errMess
  })
  .then(response => response.json())
  .then(customerIssues => dispatch(addIssues(customerIssues)))
  .catch(error => console.log(error))
}

export const addIssues = issues => ({
  type: ActionTypes.ADD_ISSUES,
  payload: issues
})

export const postIssue = (firstName,lastName,phoneNum,email,complaint) => dispatch => {
  const newIssue = {
    firstName,
    lastName,
    phoneNum,
    email,
    complaint
  }
  newIssue.date = new Date().toISOString()
  return fetch(baseUrl + 'customerissues',{
    method: "POST",
    body: JSON.stringify(newIssue),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if(response.ok){
      return response
    }
      else{
        const error = new Error(`Error ${response.status}: ${response.statusText}`)
        error.response = response;
        throw error
      }
    },
    error => {throw error }
    )
    .then(response => response.json())
    .then(response => dispatch(addIssue(response)))
    .catch(error => {
      console.log('post issue',error.message)
      alert("Please try again\nError: "+ error.message)
    })
  }

export const issuesLoading = () => ({
  type: ActionTypes.ISSUES_LOADING,
})

export const addIssue = issue => ({
  type: ActionTypes.ADD_ISSUE,
  payload: issue
})