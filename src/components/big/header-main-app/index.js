import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, responsiveHeight, fonts} from '../../../utils';
import {IconSearch} from '../../../assets';
import { Distance } from '../../small';
import {ButtonComponent} from "../../small"
const HeaderMainApp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.searchSection}>
          <IconSearch />
          <TextInput style={styles.input} placeholder="Cari Jersey. . ." />
        </View>
        <Distance width={10} />
        <ButtonComponent padding={10} />
      </View>
    </View>
  );
};

export default HeaderMainApp;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(125),
    backgroundColor: colors.primary,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 30,
  },
  searchSection: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 5,
    paddingLeft: 12,
    alignItems: 'center',
  },
  input: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
});
