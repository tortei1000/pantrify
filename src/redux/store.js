import { createStore } from 'redux'
import auth_reducer from './auth_reducer'

export default createStore(auth_reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())