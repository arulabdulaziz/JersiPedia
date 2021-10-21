import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../../utils';
import {connect} from 'react-redux';
const CardLiga = props => {
  const {liga, navigation, route} = props;
  const toJerseyByLiga = () => {
    const {uid, liga_name} = liga;
    console.log(uid, liga_name)
    if(route.name == "Home"){
      navigation.navigate('ListJersey');
    }else{
      console.log(route)
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => toJerseyByLiga()}>
      <Image source={liga.image ? {uri: liga.image} : ''} style={styles.logo} />
    </TouchableOpacity>
  );
};

export default connect()(CardLiga);

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
    marginHorizontal: 10,
  },
  logo: {
    width: responsiveWidth(57),
    height: responsiveHeight(70),
  },
});
