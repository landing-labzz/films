import React from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import { w } from '../constants'
import StarAverage from './StarAverage'

const ImageCard = ({ data, onPress, image, }) => {
  const { container, sub, h1, cover } = styles

  let imgRes = (data.profile_path === null)
  ? '/1VEM1q2JKnTzsJLnd4MUKwoN9qg.jpg'
  : data.profile_path


  let img = (data.profile_path !== undefined)
  ? data.profile_path
  : 'https://cdn.wallpapersafari.com/70/48/6Mfuwb.jpg'


  // console.log('ImageCard', data);
  return (
      <TouchableOpacity onPress={onPress}>
        <View style={container}>
          <View style={sub}>
            <Image style={cover} source={{ uri: imgRes ? `http://image.tmdb.org/t/p/w400${imgRes}` : img  }} />
          </View>

          <Text style={h1}>{
            data.name ? data.name.toUpperCase() : data.title.toUpperCase()
          }</Text>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: w / 2.4,
    paddingVertical: 10
  },
  sub: {
    shadowColor: '#000',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5},
    shadowOpacity: 0.4
  },
  h1: {
    paddingTop: 10,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  cover: {
    width: w / 2.4,
    height: w * 0.63,
    borderRadius: 10
  },
  blockAverage: {
    width: 50,
    borderRadius: 10,
    height: 40,
    backgroundColor: '#e91e63',
    position: "absolute",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 60,
    left: 90,
  },
  averageText: {
    textAlign: 'center',

    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  }

})

export default
ImageCard
