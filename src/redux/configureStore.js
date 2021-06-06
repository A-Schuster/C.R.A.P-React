import { createStore, combineReducers, applyMiddleware } from 'redux'
import { InitialForm } from './forms'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { createForms } from 'react-redux-form'
import { CustomerIssues } from './customerIssues'
import { CurrentUser } from './login';


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      customerIssues: CustomerIssues,
      currentUser: CurrentUser,
      ...createForms({
        complaintForm: InitialForm
      })
    }),
    applyMiddleware(thunk, logger)
  )

  return store
}