import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, responsiveHeight} from '../../../utils';
import {IconArrowRight} from '../../../assets';
const CardMenu = props => {
  const {menu, navigation} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate(menu.page);
      }}>
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
