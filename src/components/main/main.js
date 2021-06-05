import React from 'react'
import Home from "../home/home"
import Contact from "../contact/contact"
import HowTo from "../howto/howto"
import About from '../about/about'
import { Switch,Route,Redirect, withRouter } from 'react-router-dom';
import Header from '../header/header'
import { customerIssueComp } from '../customerIssueComp'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { addIssue } from '../../redux/ActionCreator'

const mapDipsatchToProps = {
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  addIssue: () => (addIssue())
}

export class Main extends React.Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <>
        <Header />
        <Switch>
          <Route path={'/home'} component={Home}/>
          <Route exact path={'/contact'} render={() => <Contact addIssue={this.props.addIssue} resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route exact path={'/howto'} component={HowTo}/>
          <Route exact path={'/about'} component={About}/>
          <Route exact path={'/customerissues'} component={customerIssueComp}/>
          <Redirect push to={'/home'}/>
        </Switch>
      </>
    )
  }
}

export default withRouter(connect(mapDipsatchToProps)(Main));