import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {CardChart} from '../..';
const ListChart = props => {
  const {charts} = props
  return (
    <View style={styles.container}>
      {charts.map(chart => (
        <CardChart key={chart.id} chart={chart}/>
      ))}
    </View>
  );
};

export default ListChart;

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
  },
});
