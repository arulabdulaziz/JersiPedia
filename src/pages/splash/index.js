import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Splash = props => {
  const {navigation} = props
  useEffect(() => {
      setTimeout(() => {
        navigation.replace('MainApp');
      }, 300)
  }, []);
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
