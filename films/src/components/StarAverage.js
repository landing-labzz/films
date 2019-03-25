import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import StarRating from 'react-native-star-rating';

class StarAverage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: null,
    };
  }


  render() {
    const { starCount } = this.state

    console.log(this.props)

    return (
      <StarRating
        disabled={true}
        maxStars={10}
        containerStyle={styles.container}
        halfStarEnabled={true}
        rating={this.props.vote}
        fullStarColor={'#e91e63'}
        emptyStarColor={'#fff'}
        starSize={35}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

export default StarAverage
