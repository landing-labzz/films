import React from 'react';
import HomeScreen from './screens/HomeScreen'
import Search from './screens/Search'
import Details from './screens/Details'
import Marvel from './screens/Marvel'
import Actors from './screens/Actors'
import DetailsTv from './screens/DetailsTv'
import DetailsActors from './screens/DetailsActors'
import Tv from './screens/Tv'
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';

export const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    DetailsTv: {
      screen: DetailsTv,
      navigationOptions: {
        header: null
      }
    },
    DetailsActors: {
      screen: DetailsActors,
      navigationOptions: {
        header: null
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export const TabNavigator = createBottomTabNavigator(
  {
    TopList: {
      screen: RootStack,
    },
    Marvel: {
      screen: Marvel,
    },
    Tv: {
      screen: Tv,
    },
    Actors: {
      screen: Actors,
    },
  },
 {
 defaultNavigationOptions: ({ navigation }) => ({
       tabBarIcon: ({ focused, horizontal, tintColor }) => {
         const { routeName } = navigation.state;
         let IconComponent = Ionicons;
         let iconName;
         if (routeName === 'TopList') {
           iconName = `ios-flame`;
           // Sometimes we want to add badges to some icons.
           // You can check the implementation below.
         } else if (routeName === 'Marvel') {
           iconName = `ios-cube`;
         } else if (routeName === 'Tv') {
           iconName = 'ios-easel'
         }
         else if (routeName === 'Actors') {
           iconName = 'ios-search'
         }
         return <IconComponent name={iconName} size={25} color={tintColor} />;
       },
  }),
    initialRouteName: 'TopList',
    order: [
      'TopList',
      'Marvel',
      'Tv',
      'Actors'
    ],
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
    },
    swipeEnabled: true,
    style: {
      backgroundColor: '#212121',
    },
  });

export const MyDrawerNavigator  = createDrawerNavigator({
  HomeScreen: {
    screen: TabNavigator,
    navigationOptions: {
      drawerLabel: 'Top Films',
      tintColor: '#e91e63',
      drawerIcon: ({tintColor}) => (
        <Ionicons name={'ios-flame'} size={25} color={'#e91e63'} />
      )
    },
  },
  TvScreen: {
    screen: Tv,
    navigationOptions: {
      drawerLabel: 'Tv Serials',
      drawerIcon: ({tintColor}) => (
        <Ionicons name={'ios-cube'} size={25} color={'#e91e63'} />
      )
    },
  },
  MarvelScreen: {
    screen: Marvel,
    navigationOptions: {
      drawerLabel: 'Marvel studios',
      drawerIcon: ({tintColor}) => (
        <Ionicons name={'ios-easel'} size={25} color={'#e91e63'} />
      )
    },
  },
  ActorsScreen: {
    screen: Actors,
    navigationOptions: {
      drawerLabel: 'Actors films',
      drawerIcon: ({tintColor}) => (
        <Ionicons name={'ios-search'} size={25} color={'#e91e63'} />
      )
    },
  },
}, {
  contentOptions: {
    activeLabelStyle: {
      color: '#e91e63',
    },
    inactiveLabelStyle: {
      color: '#666',
    },
    labelStyle: {
      color: '#555',
    },
  },
  drawerBackgroundColor: '#212121'
});
