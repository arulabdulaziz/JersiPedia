import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import {responsiveHeight, responsiveWidth} from '../../../utils';

const CardLiga = (props) => {
    const {liga} = props
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Image source={liga.image} style={styles.logo}/>
        </TouchableOpacity>
    )
}

export default CardLiga

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 10
  },
  logo: {
    width: responsiveWidth(57),
    height: responsiveHeight(70),
  },
});
