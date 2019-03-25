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
import { WHITE, BLUE, all } from '../constants'
import ImageCard from '../components/ImageCard'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'

import { connect } from 'react-redux'
import {
  searchChanged,
  getMovies,
  getStartState,
} from '../actions'


class HomeScreen extends Component {
  state = {
    title: 'TOP LIST',
    data: [],
    dataReset: false,
    dataImg: [],
    imgUrl: null,
    imgPathArray: [],
    fullResponseImg: null,
    visibleSearchbar: false,
    text: null,
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(all)
      const responseImg = await fetch('https://api.themoviedb.org/3/configuration?api_key=a964deeba065cbe2b07496c8bb84855a')
      const data = await response.json()
      const dataImg = await responseImg.json()
      this.setState({
        data: data.results,
        dataImg,
        imgUrl: dataImg.images.base_url,
      })
    } catch (e) {
      throw e
    }
  }


  static getDerivedStateFromProps = (props, state) => {
    if (state.visibleSearchbar === false) {
      return {
        data: (props.startState.length !== 0 ) ? props.startState : state.data
      }
    } else if (props.data) {
       return {
           data: (props.data.length !== 0) ? props.data : state.data
       }
     } else {
      return null
    }
  }

  onSearchChange = (text) => {
    this.props.searchChanged(text)
    this.props.getMovies(text)
  }
  _resetState = () => {
    this.props.getStartState()
  }

  render() {
    const {
      title,
      data,
      dataImg,
      imgUrl,
      imgPathArray,
      fullResponseImg,
      visibleSearchbar,
    } = this.state
    const { navigation, movie} = this.props
    // console.log('props',this.props);
    // console.log(data)
    return (
      <View>
      <ImageBackground source={require('../../assets/splash.png')} style={{width: '100%', height: '100%'}}>
        {
          visibleSearchbar
          ? <SearchBar
              colorRight={'#fff'}
              iconRight={'magnify'}
              placeholder="search"
              onChangeText={this.onSearchChange}
              value={movie}
              onPressRight={() =>  {this.setState({ visibleSearchbar: false}), this._resetState()} }
              onBlur={ () => this.setState({ visibleSearchbar: true  }) }
            />
          : <Header
              title={title}
              headerColor={BLUE}
              leftIcon='ios-menu'
              leftColor={WHITE}
              colorRight={'#fff'}
              iconRight="magnify"
              onPress={this.props.navigation.openDrawer}
              onPressRight={() => this.setState({ visibleSearchbar: true})}
            />
        }

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

const mapStateToProps = state => {
  return {
    movie: state.search.movie,
    data: state.search.data,
    startState: state.search.startState
  }
}
export default connect(
  mapStateToProps,
  {
    searchChanged,
    getMovies,
    getStartState
  }
)(HomeScreen);

const styles = StyleSheet.create({
  scrollImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 2,
    justifyContent: 'space-around',
    marginBottom: 150,
  }
})
