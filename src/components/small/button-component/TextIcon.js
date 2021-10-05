import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import {IconChartWhite} from '../../../assets';
import {Distance} from '../../';
const TextIcon = ({onPress, title, padding, fontSize, icon}) => {
  const Icon = () => {
    switch (icon) {
      case 'chart-white':
        return <IconChartWhite />;

      default:
        return <IconChartWhite />;
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(padding)}>
      <Icon />
      <Distance width={5} />
      <Text style={styles.title(fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: padding => ({
    padding,
    backgroundColor: colors.primary,
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
