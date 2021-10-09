import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {ListHistory} from '../../components';
import {dummyOrders} from '../../data';
const History = props => {
  const [orders, setOrders] = React.useState(dummyOrders);
  return (
    <View style={styles.page}>
      <ListHistory orders={orders} />
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
