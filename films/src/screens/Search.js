import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { WHITE, BLUE, marvelUrl, tvUrl,urlDC} from '../constants'
import ImageCard from '../components/ImageCard'
import Header from '../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ifIphoneX } from 'react-native-iphone-x-helper'

class Search extends Component {
  state = {
    title: 'Search',
    data: [],
    dataView: [],
    text: '',
  }
  componentDidMount = async () =>  {
    const response = await fetch(urlDC)
    const data = await response.json()
    try {
      this.setState({
        data: data.results
      })
      // console.log(this.state.dataTv)
    } catch (e) {
      throw e
    }
    console.log('data view', this.state.data)
  }
  setValueText = (text) => {
    this.setState({
      text
    }),
    console.log(this.state.text)
  }

  searchFilms = async () => {
    try {
      const responseSearch = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a964deeba065cbe2b07496c8bb84855a&language=en-US&query=${this.state.text}&page=1&include_adult=false`)
      const data = await responseSearch.json()
      this.setState({
        data: data.results,
      })
    } catch (e) {
      throw e
    }
  }
  onGoBack = (someDataFromChildren) => {
    console.log('someDataFromChildren', someDataFromChildren)
  }
  render() {
    const {
      title,
      data,
      text,
    } = this.state
    const { navigation, } = this.props
    return (
      <View>
        <ImageBackground source={require('../../assets/splash.png')} style={{width: '100%', height: '100%'}}>
          <Header
            detail
            title={'Search'}
            onPress={() => navigation.goBack()}
            leftIcon='ios-arrow-back'
            headerColor={BLUE}
            leftColor={WHITE}
          />
          <View style={styles.containerComs}>
          <TextInput
            style={styles.input}
            onChangeText={this.setValueText}
            value={this.state.text.toLowerCase()}
            placeholder={'Add value'}
          />
          <TouchableOpacity
            onPress={this.searchFilms}
          >
            <Ionicons
              name={'ios-search'}
              style={styles.iconSearch}
              color={'#fff'}
            />
          </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.scrollImages}>
              { data.map(item => (
                  <ImageCard
                    data={item}
                    key={item.id}
                    onPress={() => navigation.navigate('Details', ({ show: item, onGoBack: this.onGoBack}))}
                  />
              ))}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}
export default Search;

const styles = StyleSheet.create({
  scrollImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 2,
    justifyContent: 'space-around',
    marginBottom: 120,
    paddingBottom: 60,
  },
  iconSearch: {
    marginLeft: 15,
    color: '#fff',
    fontSize: 35,
  },
  containerComs: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop:20,
    paddingLeft:10,
    paddingRight: 10,
  },
  filterComs: {
    height: 40,
    width: '50%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#222',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1,
    paddingLeft: 15,
    color: '#fff',
  }
})
