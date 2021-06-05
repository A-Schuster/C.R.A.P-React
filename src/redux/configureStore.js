import { createStore, combineReducers, applyMiddleware } from 'redux'
import { InitialForm } from './forms'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { createForms } from 'react-redux-form'
import { CustomerIssues } from './customerIssues'


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      customerIssues: CustomerIssues,
      ...createForms({
        complaintForm: InitialForm
      })
    }),
    applyMiddleware(thunk, logger)
  )

  return store
}