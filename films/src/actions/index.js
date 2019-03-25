import {
  SEARCH_CHANGE,
  MOVIES_FETCHED,
  MOVIES_FAILED,
  START_STATE,
  STATE_FAILED,
} from '../types'

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGE,
    payload: text
  }
}

export const getMovies = (text) => async (dispatch) => {
  function onSuccess(success) {
    dispatch({ type: MOVIES_FETCHED, payload: success })
    return success

  }
  function onError(error) {
    dispatch({ type: MOVIES_FAILED, error })
    return error
  }
  try {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=a964deeba065cbe2b07496c8bb84855a&language=en-US&query=${text}&page=1&include_adult=false`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    // console.log('action', success.results);
    return onSuccess(success.results)
  } catch (error) {
    return onError(error)
  }
}

export const getStartState = (text) => async (dispatch) => {
  function onSuccess(success) {
    dispatch({ type: START_STATE, payload: success })
    return success

  }
  function onError(error) {
    dispatch({ type: STATE_FAILED, error })
    return error
  }
  try {
    const startUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
    const res = await fetch(startUrl, {
      method: 'GET'
    })
    const success = await res.json()
    // console.log('action reset', success.results);
    return onSuccess(success.results)
  } catch (error) {
    return onError(error)
  }
}
