import React from "react";
import {
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  WebView,
  ImageBackground,
} from "react-native";
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import ImageBigCard from '../components/ImageBigCard'
import { WHITE, BLUE,  w, h } from '../constants'
import Header from '../components/Header'
import VideoItem from '../components/VideoItem'

import {
  Asset,
  Audio,
  Font,
  Video
} from 'expo';

import YouTube from 'react-native-youtube';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';


class Details extends React.Component {
  state = {
    dataTv: [],
    isReady: false,
    status: null,
    quality: null,
    error: null,
    modalVisible: false,
    playPlayer: false,
    isTimer: false,
    isLoading: false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentWillUnmount() {
    const { onGoBack } = this.props.navigation.state.params
    onGoBack && onGoBack('Hello from children')
  }

  componentDidMount = async () =>  {
    // console.log(this.props.navigation.state.params.show.id)
    try {
      const id  = this.props.navigation.state.params.show.id
      const responseVideo = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU`)
      const responseTvVideo = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU`)
      const dataVideo = await responseVideo.json()
      const dataTv = await responseTvVideo.json()
      this.setState({
        dataTv: dataTv.results,
      })
      // console.log(this.state.dataTv)
    } catch (e) {
      throw e
    }
    // setTimeout(() => (
    //   this.setState({ isTimer: true })
    // ),1000)
  }

  _interval = null;

  _onReady = event => {
    console.log(event)
  };
  changeStateIsLoading() {
    this.setState({
      isLoading: true,
    })
  }

  render() {
    const { show } = this.props.navigation.state.params
    const { overview, name, title} = show
    const { navigation } = this.props
    const { dataTv } = this.state
    console.log(show);






     return (
      <View style={styles.container}>
      <ImageBackground source={require('../../assets/splash.png')} style={{width: '100%', height: '100%'}}>

        <Header
          detail
          title={name}
          onPress={() => navigation.goBack()}
          leftIcon='ios-arrow-back'
          headerColor={BLUE}
          leftColor={WHITE}
        />
        <ScrollView>
          <View style={styles.sub}>
            <ImageBigCard data={show} />
            <Text style={styles.h1}>{name}</Text>
            <Text style={styles.h2}>{overview}</Text>
          </View>
          <View style={{paddingBottom: 100,}}>
            {
               dataTv.map(item => (
                    <VideoItem
                      key={item.id}
                      data={show}
                      onLoad={true}
                      url={`https://www.youtube.com/embed/${item.key}?controls=0&showinfo=0`}
                    />
                  ))
            }
          </View>
          <Text>
            Похожие
          </Text>
        </ScrollView>
        </ImageBackground>
      </View>
     )
   }
 }
 export default Details

 const styles = StyleSheet.create({
   container: {
     backgroundColor: WHITE
   },
   sub: {
     flex: 1,
     alignItems: 'center',
     marginBottom: 150,
     backgroundColor: WHITE
   },
   cover: {
     width: w,
     height: w * 1.5,
     borderRadius: 10
   },
   h1: {
     fontFamily: 'Roboto',
     fontSize: 30,
     padding: 15,
     textAlign: 'center',
     fontWeight: 'bold',
     color: '#fff',
   },
   h2: {
     fontFamily: 'Roboto',
     fontSize: 15,
     textAlign: 'center',
     color: '#fff',
     paddingHorizontal: 15
   }
 })
// <Button
//   title="Go to Details... again"
//   onPress={() => this.props.navigation.push('Details')}
// />
