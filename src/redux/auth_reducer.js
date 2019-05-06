const initialState = {
  user_id: null,
  username: '',
  authenticated: false  
}

const UPDATE_USER_ID = "UPDATE_USER_ID"
const UPDATE_USERNAME = "UPDATE_USERNAME"
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS"
const LOGOUT = 'LOGOUT'


export function updateUserId(id) {
  return {
    type: UPDATE_USER_ID,
    payload: id
  }
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    payload: username
  }
}

export function updateUserDetails(obj) {
  return {
    type: UPDATE_USER_DETAILS,
    payload: obj
  }
}

export function logout(){
  return {
    type: LOGOUT
  }
}

export default function reducer(state = initialState, action){
  const { type, payload } = action
  switch(type){
    case UPDATE_USER_ID: 
      return { ...state, user_id: payload, authenticated: true }

    case UPDATE_USERNAME:
      return { ...state, username: payload }

    case UPDATE_USER_DETAILS:
    const { authenticated } = payload
      return { ...state, authenticated } 

    case LOGOUT:
      return {user_id: null, username:"", authenticated:false}
    
    default: 
      return state
  }
}