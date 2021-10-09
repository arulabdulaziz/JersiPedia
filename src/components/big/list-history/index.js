import React from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import {CardHistory} from '../..';
const ListHistory = props => {
  const {orders} = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orders}
        renderItem={({item}) => <CardHistory order={item} />}
        keyExtrator={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ListHistory;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
});
