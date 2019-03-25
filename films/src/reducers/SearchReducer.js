import {
  SEARCH_CHANGE,
  MOVIES_FETCHED,
  MOVIES_FAILED,
  START_STATE,
  STATE_FAILED,
} from '../types'


const INNITIAL_STATE = {
  movie: '',
  data: [],
  startState: [],
}
export default (state =  INNITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_CHANGE:
      return {
        ...state,
        movie: action.payload
      }
    case MOVIES_FETCHED:
      return {
        ...state,
        data: action.payload
      }
    case MOVIES_FAILED:
      return {
        ...state
      }
      case START_STATE:
        return {
          ...state,
          startState: action.payload
        }
    default: return state

  }
}
