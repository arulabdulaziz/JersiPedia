import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListChart} from '../../components';
import {dummyOrders} from '../../data';
const Chart = props => {
  return (
    <View>
      <ListChart {...props} charts={dummyOrders} />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
