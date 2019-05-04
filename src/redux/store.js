import { createStore } from 'redux'
import auth_reducer from './auth_reducer'

export default createStore(auth_reducer)