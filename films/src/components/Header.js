import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { w } from '../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Header = ({
  detail,
  leftIcon,
  leftColor,
  headerColor,
  iconRight,
  title,
  onPress,
  onPressRight,
  colorRight,

}) => {
  const {
    leftButtonStyle,
    rightIconStyle,
    container,
    subContainer,
  } = styles
  return (
    <View style={container}>
        {leftIcon &&
          <TouchableOpacity onPress={onPress}>
            <Ionicons
              name={leftIcon}
              style={leftButtonStyle}
              color={leftColor}
            />
          </TouchableOpacity>
        }
      <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold', }}>{title}</Text>
      <View>
        {iconRight &&
          <TouchableOpacity onPress={onPressRight}>
            <MaterialCommunityIcons name={iconRight} style={[rightIconStyle, { color: colorRight }]} />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height:2},
    elevation: 2,
    paddingHorizontal: 20,
    position: 'relative',
    ...ifIphoneX({
      height: 122,
      paddingTop: 70,
    },
    {
      height: 90,
      paddingTop: 40,

    },
  )
  },
  subContainer: {
  },
  rightIconStyle: {
    fontSize: 35,
  },
  leftButtonStyle: {
    fontSize: 35,
    color: '#fff',
  },

})

export default Header
