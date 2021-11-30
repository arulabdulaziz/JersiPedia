import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import FIREBASE from '../../config/FIREBASE';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors} from '../../utils';
const Midtrans = props => {
  const [loading, setLoading] = useState(false);
  const {shipping_cost, url, estimation, order_id, uid, courier, date} = props.route.params;
  const updateOrder = async () => {
    try {
      setLoading(true);
      const chartData = await FIREBASE.database()
        .ref('charts/' + uid)
        .once('value');
      if (!chartData.val()) throw {message: 'Keranjang Tidak Ditemukan'};
      const chart = chartData.val();
      const newDataChart = {
        ...chart,
        shipping_cost,
        estimation,
        url,
        order_id,
        user: uid,
        courier,
        status: 'pending',
        date,
      };
      await FIREBASE.database()
        .ref('charts/' + uid)
        .remove();
      await FIREBASE.database()
        .ref('histories')
        .child(order_id)
        .set(newDataChart);
    } catch (error) {
      const errorMessage = error.message
        ? error.message
        : JSON.stringify(error);
      Alert.alert('Error', errorMessage);
      props.navigation.replace('MainApp');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    updateOrder();
  }, []);
  return (
    <>
      {loading ? (
        <View>
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            color={colors.primary}
          />
        </View>
      ) : (
        <WebView source={{uri: url}} />
      )}
    </>
  );
};

export default Midtrans;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.primary,
  },
});
