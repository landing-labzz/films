import React from 'react'
import { TouchableOpacity,
   View,
   Text,
   StyleSheet,
   TextInput,
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { w } from '../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// import _ from 'lodash'

const SearchBar = ({
    onChangeText,
    onPress,
    placeholder,
    value,
    onBlur,
    headerColor,
    colorRight,
    onPressRight,
    iconRight,
  }) => {

  const {
    viewStyle,
    inputStyle,
    subContainer,
    iconRightStyle,
    searchStyle,
    container,
  } = styles

  return (
    <View style={[container, {backgroundColor: headerColor }]}>
      <View style={subContainer}>
      <TextInput
        style={inputStyle}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
      />
      <TouchableOpacity onPress={onPressRight}>
        <View style={searchStyle}>
          <MaterialCommunityIcons name={iconRight} style={[ iconRightStyle, {color: colorRight}]} />
        </View>
      </TouchableOpacity>
      </View>
    </View>
  )
}
export default SearchBar


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height:2},
    elevation: 2,
    paddingHorizontal: 20,
    position: 'relative',
    ...ifIphoneX({
      height: 122,
      paddingTop: 20,
    },
    {
      height: 90,
      paddingTop: 10,
    },
  )
  },
  subContainer: {
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: w - 35,
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
  },
  inputStyle: {
    fontSize: 18,
    height:23,
    width: w - 90,
    marginLeft: 15,
    backgroundColor: '#fff',

  },
  searchStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  iconRightStyle: {
    fontSize: 30,
    marginTop: 2,
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: 'gold',
    paddingLeft: 15,
    position: 'relative',
    ...ifIphoneX({
      height: 122
    }, {
      height: 90
    })
  },

})
