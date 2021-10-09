import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts, responsiveWidth, numberWithCommas} from '../../../utils';
import {Distance} from '..';
const CardHistory = props => {
  const {order} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{order.date}</Text>
      {order.orders.map((history, index) => (
        <View key={history.id} style={styles.history}>
          <Text>{index + 1}. </Text>
          <Image source={history.product.images[0]} style={styles.jersey} />
          <View style={styles.desc}>
            <Text style={styles.name}>{history.product.name}</Text>
            <Text style={styles.price}>
              Rp. {numberWithCommas(history.product.price)}
            </Text>
            <Distance height={10} />
            <Text style={styles.textBold}>
              Pesan: <Text style={styles.text}>{history.total_order}</Text>
            </Text>
            <Text style={styles.textBold}>
              Total Harga:{' '}
              <Text style={styles.text}>{history.total_price}</Text>
            </Text>
          </View>
        </View>
      ))}
      <Distance height={10} />
      <View style={styles.footer}>
        <View style={styles.label}>
          <Text style={styles.textBlue}>Status: </Text>
          <Text style={styles.textBlue}>Ongkir (2-3 Hari): </Text>
          <Text style={styles.textBlue}>Total Harga: </Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.textBlue}>
            {order.status == 'chart' ? 'Belum Bayar' : 'LUNAS'}
          </Text>
          <Text style={styles.textBlue}>Rp. {numberWithCommas(15000)} </Text>
          <Text style={styles.textBlue}>
            Rp. {numberWithCommas(order.total_price + 15000)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  history: {
    flexDirection: 'row',
    marginTop: 10,
  },
  jersey: {
    width: responsiveWidth(66),
    height: responsiveWidth(66),
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  },
  label: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  textBlue: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  text: {
    fontSize: 11,
    fontFamily: fonts.primary.regular,
  },
  textBold: {
    fontSize: 11,
    fontFamily: fonts.primary.bold,
  },
  desc: {
    marginLeft: responsiveWidth(7),
  },
  name: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
  },
});
