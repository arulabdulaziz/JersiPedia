import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '@utils';
const TextOnly = ({onPress, title, padding, fontSize}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(padding)}>
      <Text style={styles.title(fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextOnly;

const styles = StyleSheet.create({
  container: padding => ({
    padding,
    backgroundColor: colors.primary,
    borderRadius: 5,
  }),
  title: fontSize => ({
    fontSize: fontSize ? fontSize : 13,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    color: 'white',
  }),
});
