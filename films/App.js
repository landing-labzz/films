import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import combineReducers from './src/reducers'

import { View, Text, Button } from 'react-native';
import {RootStack, MyDrawerNavigator, TabNavigator} from './src/routes'
import HomeScreen from './src/screens/HomeScreen'

import { createAppContainer } from 'react-navigation';
const AppContainer = createAppContainer(MyDrawerNavigator);

const logger = (store) => (next) => (action) => {
  console.log('action fired', action);
  next(action)
}

const error = (store) => (next) => (action) => {
  try {
    next(action)
  } catch (e) {
    console.error('error', e);
  }
}
const store = createStore(combineReducers, applyMiddleware(ReduxThunk, logger, error))

store.subscribe( () => {
  console.log('store changed', store.getState());
})
const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
export default App
