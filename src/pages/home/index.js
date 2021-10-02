import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {HeaderMainApp} from '../../components';
const Home = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMainApp />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
