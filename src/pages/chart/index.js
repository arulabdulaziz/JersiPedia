import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListChart} from '../../components';
import {dummyOrders} from '../../data';
const Chart = props => {
  return (
    <View>
      {dummyOrders
        .filter(e => e.status == 'chart')
        .map(chart => (
          <ListChart {...props} chart={chart} key={chart.id} />
        ))}
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
