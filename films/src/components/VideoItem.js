import React from "react";
import {
  View,
  StyleSheet,
  WebView,
  Text,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import ImageBigCard from './ImageBigCard'
import HomeScreen from '../screens/HomeScreen'

class VideoItem extends React.Component {
  _checkError() {
    console.log('Load end');
  }
  _renderImage() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    )
  }

  render () {
    return (
      <WebView
        useWebKit={true}
        style={{ width: '100%', height: 300, marginBottom: 20, }}
        source={{uri: this.props.url}}
        renderLoading={this._renderImage}
        startInLoadingState


      />
    )
  }
}
export default VideoItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  horizontal: {
    justifyContent: 'space-around',
    padding: 10
  }
})
