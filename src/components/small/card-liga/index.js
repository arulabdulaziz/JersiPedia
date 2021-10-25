import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../../utils';
import {connect} from 'react-redux';
import {setLiga, getListJersey, deleteKeyword} from '../../../store/actions';
const CardLiga = props => {
  const {liga, navigation, route} = props;
  const toJerseyByLiga = () => {
    console.log('toJerseyByLiga');
    props.deleteKeyword();
    const {uid, liga_name} = liga;
    props.setLiga(uid, liga_name);
    console.log(uid, liga_name);
    if (route.name != 'ListJersey') {
      navigation.navigate('ListJersey');
    } else {
      props.getListJersey();
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => toJerseyByLiga()}>
      <Image source={liga.image ? {uri: liga.image} : ''} style={styles.logo} />
    </TouchableOpacity>
  );
};
const mapStateToDispatch = dispatch => ({
  setLiga: (id, name) => dispatch(setLiga(id, name)),
  getListJersey: () => dispatch(getListJersey()),
  deleteKeyword: () => dispatch(deleteKeyword()),
});
export default connect(null, mapStateToDispatch)(CardLiga);

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
