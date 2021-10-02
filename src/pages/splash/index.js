import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Logo, Ilustration} from '../../assets';
const Splash = props => {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000)
  }, []);
  return (
    <View style={styles.pages}>
      <Logo />
      <View style={styles.ilustration}>
        <Ilustration />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ilustration: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
