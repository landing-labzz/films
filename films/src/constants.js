import { Dimensions } from 'react-native'

export const win = Dimensions.get('window')
export const w = win.width
export const h = win.height

export const responsive = {
  mobile5: w > 315 && w < 341,
  mobile8: w > 342 && w < 375,
  mobile8plus: w > 375 && w < 415,
  tablet: w < 990 && w > 415
}
export const all = 'https://api.themoviedb.org/3/discover/movie?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
export const genresUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU&page=1'
export const tvUrl = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-Ru&page=1'
export let urlDC = 'https://api.themoviedb.org/3/search/movie?api_key=a964deeba065cbe2b07496c8bb84855a&language=en-US&query=dc&page=1&include_adult=false'
