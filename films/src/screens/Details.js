import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
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
import ImageCard from '../components/ImageCard'
import { WHITE, BLUE,  w, h } from '../constants'
import Header from '../components/Header'
import VideoItem from '../components/VideoItem'
import StarAverage from '../components/StarAverage'
import {
  Asset,
  Audio,
  Font,
  Video
} from 'expo';
import moment from 'moment'


class Details extends React.Component {
  state = {
    dataVideo: [],
    resultsVideo: [],
    dataSimilar: [],
    idFilm: null,
    dataRelises: [],
    releaseArr: [],
    itemRelease: [],
    vote_average: null,

    isReady: false,
    status: null,
    quality: null,
    error: null,
    modalVisible: false,
    playPlayer: false,
    isTimer: false,
    isLoading: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentWillUnmount() {
    const { onGoBack } = this.props.navigation.state.params
    onGoBack && onGoBack('Hello from children')
  }
  componentDidMount = async () =>  {
    try {
      const id  = this.props.navigation.state.params.show.id
      let showAverage = this.props.navigation.state.params.show.vote_average
      const responseVideo = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU`)
      const responseTvVideo = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU`)
      const responseDateRelise = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=a964deeba065cbe2b07496c8bb84855a`)
      const dataVideo = await responseVideo.json()
      const dataTv = await responseTvVideo.json()
      const dataRelises = await responseDateRelise.json()
      const similarResponse = await fetch(`https://api.themoviedb.org/3/movie/${dataVideo.id}/recommendations?api_key=a964deeba065cbe2b07496c8bb84855a&language=ru-RU&page=1`)
      const dataSimilar = await similarResponse.json()

      this.setState({
        dataVideo: dataVideo.results,
        data: dataVideo,
        idFilm: dataVideo.id,
        dataSimilar: dataSimilar.results,
        dataRelises: dataRelises.results,
        releaseArr: dataRelises.results.find(item => item.iso_3166_1 === 'RU'),
        vote_average: showAverage,
      })

    } catch (e) {
      throw e
    }
    this.setState({
      itemRelease: this.state.releaseArr.release_dates
    })
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
  _checkError() {
    console.log('Error');
  }
  _mapingVideoElements () {
    return (
      this.state.dataVideo.map(item => (
           <VideoItem
             key={item.id}
             data={this.props.navigation.state.params.show}
             url={`https://www.youtube.com/embed/${item.key}?controls=1&showinfo=1&fullScreen=2`}
           />
         ))
    )
  }
  render() {
    const { show } = this.props.navigation.state.params
    const { overview, title} = show
    const { navigation } = this.props
    const {
      dataVideo,
      resultsVideo,
      dataSimilar,
      releaseArr,
      itemRelease,
      vote_average
    } = this.state
    
     return (
      <View style={styles.container}>
      <ImageBackground source={require('../../assets/splash.png')} style={{width: '100%', height: '100%'}}>
        <Header
          detail
          title={title}
          onPress={() => navigation.goBack()}
          leftIcon='ios-arrow-back'
          headerColor={BLUE}
          leftColor={WHITE}
        />
        <ScrollView>
          <View style={styles.sub}>
            <ImageBigCard data={show} />
            <Text style={styles.h1}>{title}</Text>
            <Text style={styles.h2}>{overview}</Text>
          </View>
          <View>
          {this._mapingVideoElements()}
          </View>
          <View style={styles.datesText}>
            <Text style={styles.titleText}>Дата релиза в России</Text>
            {
              itemRelease.map((item, index) => {
                let nowDate = moment(item.release_date).format('YYYY.MM.DD')
                return (
                  <Text
                    style={styles.dateText}
                    key={`${item.release_date}_${index}`}>
                    {nowDate}
                  </Text>
                )
              })
            }
          </View>
          <View style={styles.containerStars}>
            <Text style={styles.averageText}>
              Рейтинг
            </Text>
              <StarAverage
                data={dataVideo}
                vote={vote_average}
              />
          </View>
          <View>
            <Text style={styles.similartext}>Похожие фильмы</Text>
          </View>
          <View style={styles.scrollImages}>
            { dataSimilar.map(item => (
                <ImageCard
                  data={item}
                  key={item.id}
                  onPress={() => navigation.push('Details', ({ show: item, onGoBack: this.onGoBack}))}
                />
            ))}
          </View>
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
   dateText: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#fff',
     textAlign: 'center',
   },
   titleText: {
     fontSize: 26,
     fontWeight: 'bold',
     color: '#fff',
     textAlign: 'center',
   },
   datesText: {
     paddingTop: 20,
     paddingBottom: 35,
   },
   similartext: {
     textAlign: 'center',
     color: '#fff',
     fontSize: 32,
     paddingBottom: 24,

   },
   averageText: {
     fontSize:26,
     fontWeight: 'bold',
     textAlign: 'center',
     color: '#fff',
     marginBottom: 20,
   },
   containerStars: {
     paddingTop: 30,
     paddingBottom: 30,
     textAlign: 'center',
   },
   scrollImages: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     flexShrink: 2,
     justifyContent: 'space-around',
     marginBottom: 150,
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
