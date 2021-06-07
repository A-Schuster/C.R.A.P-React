import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '../redux/ActionCreator'
import { IssueWrapper } from '../Styles'
import { Loading } from './loadingComp'



export const customerIssueComp = () => {
  const dispatch = useDispatch()
  dispatch(fetchIssues())
  return(
    <IssueWrapper>
      <RenderCustomerIssues/>
    </IssueWrapper>
  )
}

const RenderCustomerIssues = () => {
  const customerIssues = useSelector(state => state.customerIssues)
  if(customerIssues.isLoading === false){
    return(
      <>
        <div>
          {customerIssues.issues.map(customerIssue => {
            const {firstName, lastName, phoneNum, email, complaint, id} = customerIssue
            return(
              <div key={id + firstName}>
                <h1>{firstName + ' ' + lastName }</h1>
                <h4>{`Email ${email}`}</h4>
                <h4>{`Phone# ${phoneNum} `}</h4>
                <p>{`Issue:${complaint}`}</p>
              </div>
            )
          })}
        </div>
      </>
    )
  }else{
    return(
      <div>
        <Loading/>
      </div>
    )
  }
  
}