import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { WHITE, BLUE, tvUrl, } from '../constants'
import ImageCard from '../components/ImageCard'
import Header from '../components/Header'

class Tv extends Component {
  state = {
    title: 'TV',
    data: [],
  }
  componentDidMount = async () => {
    try {
      const response = await fetch(tvUrl)
      const data = await response.json()
      this.setState({
        data: data.results,
      })
    } catch (e) {
      throw e
    }
    console.log(this.state.data)
  }
  onGoBack = (someDataFromChildren) => {
    console.log('someDataFromChildren', someDataFromChildren)
  }
  render() {
    const {
      title,
      data,
    } = this.state
    const { navigation } = this.props
     return (
      <View>
      <ImageBackground source={require('../../assets/splash.png')} style={{width: '100%', height: '100%'}}>
        <Header
          title={title}
          headerColor={BLUE}
          leftIcon='ios-menu'
          leftColor={WHITE}
          onPress={navigation.openDrawer}
        />
        <ScrollView>
          <View style={styles.scrollImages}>
          { data.map(item => (
              <ImageCard
                data={item}
                key={item.id}
                onPress={() => navigation.navigate('DetailsTv', ({ show: item, onGoBack: this.onGoBack}))}
              />
          ))}
          </View>
        </ScrollView>
      </ImageBackground>
      </View>
    )
  }
}
export default Tv;

const styles = StyleSheet.create({
  scrollImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 2,
    justifyContent: 'space-around',
    marginBottom: 150,
  }
})
