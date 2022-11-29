import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {
  colors,
  fonts,
  responsiveHeight,
  clearStorage,
  getData,
} from '@utils';
import {IconArrowRight} from '@assets';
import FIREBASE from '@config/FIREBASE';
import {useDispatch} from 'react-redux';
import {LOGOUT_USER} from '@store/actions';
const CardMenu = props => {
  const dispatch = useDispatch();
  const {menu, navigation} = props;
  const onNavigate = () => {
    if (menu.page == 'Login') {
      getData('user')
        .then(value => {
          if (value) {
            return FIREBASE.auth().signOut();
          } else {
            return true;
          }
        })
        .then(function () {
          dispatch({type: LOGOUT_USER});
          clearStorage();
          navigation.replace('Login');
        })
        .catch(function (error) {
          Alert.alert('Error', JSON.stringify(error));
        });
    } else {
      navigation.navigate(menu.page);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onNavigate()}>
      <View style={styles.menu}>
        {menu.image}
        <Text style={styles.text}>{menu.name}</Text>
      </View>
      <IconArrowRight />
    </TouchableOpacity>
  );
};

export default CardMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 30,
    padding: responsiveHeight(15),
    borderRadius: 10,
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    marginLeft: 20,
  },
});
