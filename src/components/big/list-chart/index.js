import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {CardChart} from '../..';
const ListChart = props => {
  const {orders} = props
  return (
    <View style={styles.container}>
      {/* {orders.map((chart, i) => (
        <CardChart key={i} chart={chart}/>
      ))} */}
      <CardChart chart={orders} />
    </View>
  );
};

export default ListChart;

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
  },
});
