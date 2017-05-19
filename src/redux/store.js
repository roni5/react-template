// @flow
/* eslint-disable arrow-body-style */
import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction'
import errorDisplayMiddleware from 'src/redux/middleware/errorDisplay'
import rootEpic from './epics'
import rootReducer from './modules'


function configureStore (
  preloadedState: Object, history: Object,
): Object {

  const epicMiddleware = createEpicMiddleware(rootEpic)

  const middleware = [
    epicMiddleware,
    thunk,
    promiseMiddleware(),
    errorDisplayMiddleware,
    routerMiddleware(history),
  ]

  // only log redux actions in development
  if (process.env.NODE_ENV === 'development') {

    // logger needs to be last
    // uncomment if needed
    // middleware.push(require('redux-logger').createLogger())

  }

  // https://github.com/zalmoxisus/redux-devtools-extension
  // https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f

  const enhancer = compose(
    applyMiddleware(...middleware),
    devToolsEnhancer()
  )

  const store = createStore(rootReducer, preloadedState, enhancer)

  return store

}


export default configureStore
