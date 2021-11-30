import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Distance} from '../../';
const TextLoading = ({padding, fontSize}) => {
  return (
    <TouchableOpacity style={styles.container(padding)}>
      <ActivityIndicator color="#FFFFFF" size="small" />
      <Distance width={5} />
      <Text style={styles.title(fontSize)}>Loading...</Text>
    </TouchableOpacity>
  );
};

export default TextLoading;

const styles = StyleSheet.create({
  container: padding => ({
    padding,
    backgroundColor: colors.border,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  title: fontSize => ({
    fontSize,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    color: 'white',
  }),
});
