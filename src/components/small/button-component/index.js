import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconChart} from '../../../assets';
import TextOnly from './TextOnly';
const ButtonComponent = props => {
  const {onPress, padding, totalChart, type, icon} = props;
  const Icon = () => {
    switch (icon) {
      case 'chart':
        return <IconChart />;
      default:
        return <IconChart />;
    }
  };
  if (type == 'text') {
    return <TextOnly {...props} />;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container(padding ? padding : 0)}>
      <Icon />
      {totalChart && (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{totalChart}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: padding => ({
    padding: padding,
    backgroundColor: 'white',
    borderRadius: 5,
  }),
  notif: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 3,
    padding: 3,
  },
  textNotif: {
    fontSize: 8,
    color: 'white',
  },
});
