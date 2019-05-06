const initialState = {
  recipes: [],
  title: '',
  instructions: '',
  ingredients: {name: '', quantity:null, unit: '', is_in_pantry: false, is_in_shopping_list: false}
}

const CREATE_RECIPE = 'CREATE_RECIPE'


export function updateUserId(id) {
  return {
    type: UPDATE_USER_ID,
    payload: id
  }
}

export function createRecipe(){
  return {
    type: CREATE_RECIPE,
    payload: {title, instructions, ingredients:{name, quantity, unit}}
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