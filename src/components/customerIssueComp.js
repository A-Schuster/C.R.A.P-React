import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues, toggleIssueComplete } from '../redux/ActionCreator'
import { IssueWrapper } from '../Styles'
import { Loading } from './loadingComp'



export const CustomerIssueComp = () => {
  const dispatch = useDispatch()
  dispatch(fetchIssues())
  return(
    <IssueWrapper>
      <RenderCustomerIssues/>
    </IssueWrapper>
  )
}

const CustomerIssue = (props) => {
  return(
    props.issues.map(customerIssue => {
      const {firstName, lastName, phoneNum, email, complaint, id,completed, username} = customerIssue
      return(
        <div key={id + firstName}>
          <h1>{firstName + ' ' + lastName }</h1>
          {username && <h4>{username}</h4>}
          <h4>{`Email ${email}`}</h4>
          <h4>{`Phone# ${phoneNum} `}</h4>
          <p>{`Issue:${complaint}`}</p>
          <button id={id} onClick={() => props.toggleComplete(customerIssue)}>{!completed ? "Mark Complete" : "Re-open"}</button>
        </div>
        )
    })
  )
}


const RenderCustomerIssues = () => {
  const dispatch = useDispatch()
  const toggleComplete = ({id,completed}) => {
    const issue = ({
      id,
      completed
    })
    dispatch(toggleIssueComplete(issue))
  }
  const customerIssues = useSelector(state => state.customerIssues)
  let completed = customerIssues.issues.filter(issue => issue.completed)
  let open = customerIssues.issues.filter(issue => !issue.completed)

  if(customerIssues.loading === false){
    return(
      <>
        <div>
          <h1>Open Issues</h1>
            {<CustomerIssue toggleComplete={toggleComplete} issues={open} />}
          <h1>Completed Issues</h1>
            {<CustomerIssue toggleComplete={toggleComplete} issues={completed} />}
        </div>
      </>
    )
  }
  return(
    <div>
      <Loading/>
    </div>
  )
}