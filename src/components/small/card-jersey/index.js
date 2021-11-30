import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, fonts, responsiveWidth, responsiveHeight} from '../../../utils';
import ButtonComponent from '../button-component';
const CardJersey = props => {
  const {jersey, onPress} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image
          source={jersey.image[0] ? {uri: jersey.image[0]} : ''}
          style={styles.image}
        />
        <Text style={styles.label}>{jersey.name}</Text>
      </TouchableOpacity>
      <ButtonComponent
        type="text"
        title="Detail"
        padding={7}
        fontSize={13}
        onPress={onPress}
      />
    </View>
  );
};

export default CardJersey;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: colors.yellow,
    width: responsiveWidth(150),
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 124,
    height: 124,
  },
  label: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
