import { createStore, applyMiddleware } from 'redux'
import rootReducer from 'reducers/rootReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default () =>
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducer, applyMiddleware(thunk))
    : createStore(rootReducer, applyMiddleware(thunk, logger))
