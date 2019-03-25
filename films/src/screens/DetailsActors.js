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


class DetailsActors extends React.Component {
  state = {
    data: {},
    info: [],
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
      const data = this.props.navigation.state.params.show
      this.setState({
        data,
        info: data.known_for,
       })
    } catch (e) {
      throw e
    }
  }


  render() {

    const { show } = this.props.navigation.state.params
    const { overview, title, name} = show
    const { navigation , infItem} = this.props
    const {
      data,
      info,
    } = this.state
    console.log('infItem', infItem);
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

          <View style={styles.datesText}>
            <Text style={styles.titleText}></Text>
          </View>
          <View style={styles.containerStars}>
            <Text style={styles.averageText}>
              Рейтинг
            </Text>
              <StarAverage
              />
          </View>
          <View>
            <Text style={styles.similartext}>Похожие фильмы</Text>
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
   }
 }
 export default DetailsActors

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
