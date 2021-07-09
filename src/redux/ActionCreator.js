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

export const postIssue = (firstName,lastName,phoneNum,email,complaint,username) => dispatch => {
  const newIssue = {
    firstName,
    lastName,
    phoneNum,
    email,
    complaint,
    username
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
    .then(response => {
      if(username){
        dispatch(postUserIssue(username,response))
      }
      dispatch(addIssue(response))
    })
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

export const postUserIssue = (user,issue) => (dispatch) => {
  dispatch(fetchUsers())
  .then(response => {
    return response.filter(res => res.username === user)[0]
  })
.then(response => {
  const {id,issues} = response;
    return fetch(baseUrl + 'users/' + id,{
      method: "PUT",
      body: JSON.stringify({
        ...response,
        issues: [...issues, issue]
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
  })
  .then(response => response.json())
  .then(response => console.log(response))
}

export const fetchUsers = () => () => {
  return fetch(baseUrl + "users")
  .then(response => {
    if(response.ok){
      return response
    }
    else{
      const error = new Error(`Error ${response.status}: ${response.statusText}`)
      error.response = response;
      throw error
    }
  })
  .then(response => response.json())
  .then(response => {
    return response
  })
}


export const verifyUser = ({username,password,checked}) => dispatch => {
  const currentUser = ({
    username,
    password,
    checked
  })
  dispatch(fetchUsers())
  .then(response => {
    const filtered = response.filter(user => {
      if(user.username === currentUser.username && currentUser.password === user.password ){
        return user
      }
    })
    if(filtered.length >= 1){
      return filtered
    }
    else{
      const error = new Error(`Username and or Password are Incorrect`)
      error.response = response;
      alert(error) 
      return null
    }
  })
  .then(response => {
    if(response){
      dispatch(loginUser(response))
    }
  })
}

export const handleLogin = (currentUser) => dispatch => {
  dispatch(loadingUser())
  dispatch(verifyUser(currentUser))
}
export const loadingUser = () => ({
  type: ActionTypes.LOADING_USER
})

export const loginUser = user => ({
  type: ActionTypes.LOGIN_USER,
  payload: user
})

export const logOut = () => ({
  type: ActionTypes.LOG_OUT
})

export const toggleIssueComplete = (issue) => dispatch => {
  const {id,completed} = issue
  return fetch(`${baseUrl}customerissues/${id}`,{
    method: 'PATCH',
    body: JSON.stringify({
      completed: completed ? false : true
    }),
    headers:{
      "Content-type": "application/json"
    }
  })
  .then(response => {
    if(response.ok){
      dispatch(fetchIssues())
    }
  })
}