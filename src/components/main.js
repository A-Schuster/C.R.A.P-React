import React from 'react'
import Home from "./home"
import Contact from "./contact"
import HowTo from "./howto"
import About from './about'
import { Switch,Route,Redirect, withRouter } from 'react-router-dom';
import Header from './header'
import { CustomerIssueComp } from './customerIssueComp'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { addIssue } from '../redux/ActionCreator'
import { Issues } from './issues'

const mapDipsatchToProps = {
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  addIssue: () => (addIssue())
}
const mapStateToProps = state  => {
  return{
    currentUser: state.currentUser.currentUser
  }
}

class Main extends React.Component {
  render(){
    let isEmployee
    let loggedIn
    if(this.props.currentUser[0]){
      isEmployee = this.props.currentUser[0].role === "employee" ? true : false
      loggedIn = this.props.currentUser[0] ? true : false
    }
    return(
      <>
        <Header isEmployee={isEmployee} loggedIn={loggedIn}/>
        <Switch>
          <Route path={'/home'} component={Home}/>
          <Route exact path={'/contact'} render={() => <Contact addIssue={this.props.addIssue} resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route exact path={'/howto'} component={HowTo}/>
          <Route exact path={'/about'} component={About}/>
          {isEmployee && <Route exact path={'/customerissues'} component={CustomerIssueComp}/>}
          {loggedIn && <Route exact path={'/issues'} render={() => <Issues currentUser={this.props.currentUser[0]}/>}/>}
          <Redirect push to={'/home'}/>
        </Switch>
      </>
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDipsatchToProps)(Main));