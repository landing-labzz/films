import React, { Component } from 'react'
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
import ImageCardActors from '../components/ImageCardActors'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import {
  searchChanged,
  getMovies,
  getStartState,
} from '../actions'

class Actors extends Component {
  state = {
    title: 'ACTORS',
    data: [],
    visibleSearchbar: false,
    dataImg: [],
    imgUrl: null,
    config: null,

  }

  componentDidMount = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=a964deeba065cbe2b07496c8bb84855a&language=en-US&page=1`)
      const configUrl = await fetch('https://api.themoviedb.org/3/configuration?api_key=a964deeba065cbe2b07496c8bb84855a')

      const data = await response.json()
      const config = await configUrl.json()


      this.setState({
        data: data.results,
        dataImg: config,
        imgUrl: config.images.base_url,
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
  render () {
    const { navigation, movie} = this.props
    const {
      title,
      data,
      visibleSearchbar,
      dataImg,
      imgUrl,
      config,
    } = this.state
    // console.log(data);
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
                <ImageCardActors
                  infItem={item}
                  imageActor={item.profile_path}
                  key={item.id}
                  onPress={() => navigation.navigate('DetailsActors', ({ show: item, onGoBack: this.onGoBack}))}
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
)(Actors);

const styles = StyleSheet.create({
  scrollImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 2,
    justifyContent: 'space-around',
    marginBottom: 150,
  }
})
