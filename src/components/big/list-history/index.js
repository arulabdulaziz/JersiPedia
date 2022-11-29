import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {CardHistory} from '../..';
import {colors, getData} from '@utils';
import Spinner from 'react-native-loading-spinner-overlay';
import FIREBASE from '@config/FIREBASE';
const ListHistory = props => {
  const [orders, setOrders] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const onRefresh = React.useCallback(() => {
    getAllData();
  }, []);
  React.useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async () => {
    try {
      setRefreshing(true);
      const user = await getData('user');
      const data = await FIREBASE.database()
        .ref('histories')
        .orderByChild('user')
        .equalTo(user.uid)
        .once('value');
      if (!data.val()) throw {message: 'History Tidak Ditemukan'};
      setOrders(
        Object.keys(data.val()).map(key => {
          return {
            id: key,
            ...data.val()[key],
            orders: Object.keys(data.val()[key].orders).map(e => {
              return {
                id: e,
                ...data.val()[key].orders[e],
              };
            }),
          };
        }),
      );
    } catch (error) {
      const errorMessage = error.message
        ? error.message
        : JSON.stringify(error);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        color={colors.primary}
      />
      {/* <Text>{JSON.stringify(orders)}</Text> */}
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
  spinnerTextStyle: {
    color: colors.primary,
  },
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
});
