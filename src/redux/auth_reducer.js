const initialState = {
  user_id: null,
  username: '',
  authenticated: false,
  recipes: [],
  title: '',
  instructions: '',
  ingredients: [],
  recipe_id: null,
  image: ''
}

const UPDATE_USER_ID = "UPDATE_USER_ID"
const UPDATE_USERNAME = "UPDATE_USERNAME"
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS"
const LOGOUT = 'LOGOUT'
const CREATE_RECIPE_TITLE = 'CREATE_RECIPE_TITLE'
const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
const REFRESH_STATE = 'REFRESH_STATE'
const CREATE_RECIPE_IMAGE = 'CREATE_RECIPE_IMAGE'


export function refreshState() {
  return {
    type: REFRESH_STATE,

  }
}
export function addIngredients(obj) {
  return {
    type: ADD_INGREDIENTS,
    payload: obj
  }
}

export function updateUserId(id) {
  return {
    type: UPDATE_USER_ID,
    payload: id
  }
}

export function createRecipeTitle(obj) {
  return {
    type: CREATE_RECIPE_TITLE,
    payload: obj
  }
}

export function createRecipeImage(image) {
  return {
    type: CREATE_RECIPE_IMAGE,
    payload: image
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

export function logout() {
  return {
    type: LOGOUT
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_USER_ID:
      return { ...state, user_id: payload, authenticated: true }

    case UPDATE_USERNAME:
      return { ...state, username: payload }

    case UPDATE_USER_DETAILS:
      const { authenticated } = payload
      return { ...state, authenticated }

    case CREATE_RECIPE_TITLE:
      const { user_id, title, instructions } = payload
      return { ...state, user_id, title, instructions }
    case ADD_INGREDIENTS:
      const { name, quantity, unit } = payload
      return { ...state, ingredients: [...state.ingredients, { name, quantity, unit }] }
    case LOGOUT:
      return { ...state, user_id: null, username: "", authenticated: false }
    case REFRESH_STATE:
      return {
        ...state, title: '', instructions: '', ingredients: []
      }
    case CREATE_RECIPE_IMAGE:
      
      return {...state, image:payload }


    default:
      return state
  }
}