import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconHome,
  IconHomeActive,
  IconJersey,
  IconJerseyActive,
  IconProfile,
  IconProfileActive,
} from '@assets';
import {colors, fonts} from '@utils';
const TabItem = ({onPress, onLongPress, isFocused, label}) => {
  const Icon = () => {
    switch (label) {
      case 'Home':
        return isFocused ? <IconHomeActive /> : <IconHome />;
      case 'Jersey':
        return isFocused ? <IconJerseyActive /> : <IconJersey />;
      case 'Profile':
        return isFocused ? <IconProfileActive /> : <IconProfile />;
      default:
        return isFocused ? <IconHomeActive /> : <IconHome />;
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: isFocused => ({
    color: isFocused ? 'white' : colors.secondary,
    fontFamily: fonts.primary.bold,
  }),
});
