import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {ListHistory} from '../../components';
const History = props => {
  return (
    <View style={styles.page}>
      <ListHistory  {...props}/>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
