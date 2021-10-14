import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconChart, IconBack} from '../../../assets';
import TextIcon from './TextIcon';
import TextOnly from './TextOnly';
import TextLoading from "./TextLoading"
const ButtonComponent = props => {
  const {onPress, padding, totalChart, type, icon, loading} = props;
  if(loading){
    return <TextLoading {...props}/>
  }
  const Icon = () => {
    switch (icon) {
      case 'chart':
        return <IconChart />;
      case 'arrow-left':
        return <IconBack />;
      default:
        return <IconChart />;
    }
  };
  if (type == 'text') {
    return <TextOnly {...props} />;
  } else if (type == 'text-icon') {
    return <TextIcon {...props} />;
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
