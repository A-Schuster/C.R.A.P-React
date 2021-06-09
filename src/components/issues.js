import React from "react";

export const Issues = (props) => {
  const {issues} = props.currentUser
  return(
    <div>
      {issues.map((issue) => <IssueComponent issue={issue}/>)}
    </div>
  )
}

export const IssueComponent = ({issue}) => {
  return(
    <div>
      <h3>{issue.complaint}</h3>
    </div>
  )
}