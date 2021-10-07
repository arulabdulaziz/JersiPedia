import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  fonts,
  colors,
  heightMobileUI,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {ButtonComponent, CardAddress, Picker, Distance} from '../../components';
import {dummyOrders, dummyProfile} from '../../data';

const Checkout = props => {
  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        <Text style={styles.textBold}>Apakah Benar Alamat Ini ?</Text>
        <CardAddress {...props} profile={dummyProfile} />
        <View style={styles.totalPrice1}>
          <Text style={styles.textBold}>Total Harga:</Text>
          <Text style={styles.textBold}>
            Rp.{' '}
            {numberWithCommas(
              dummyOrders
                .filter(e => e.status == 'chart')
                .map(e => e.total_price)
                .reduce((a, b) => a + b, 0),
            )}
          </Text>
        </View>
        <Picker options={[]} label="Pilih Expedisi:" />
        <Distance height={10} />
        <Text style={styles.textBold}>Biaya Ongkir</Text>
        <Distance height={10} />
        <View style={styles.shipping}>
          <Text style={styles.text}>
            Untuk Berat:{' '}
            {numberWithCommas(
              dummyOrders
                .filter(e => e.status == 'chart')
                .map(e => e.weight)
                .reduce((a, b) => a + b, 0),
            )}{' '}
            kg
          </Text>
          <Text style={styles.textBold}>Rp. {numberWithCommas(50000)}</Text>
        </View>
        <Distance height={5} />
        <View style={styles.shipping}>
          <Text style={styles.text}>Estimasi Waktu</Text>
          <Text style={styles.textBold}>2-3 Hari</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalPrice}>
          <Text style={styles.textBold}>Total Harga:</Text>
          <Text style={styles.textBold}>
            Rp.{' '}
            {numberWithCommas(
              dummyOrders
                .filter(e => e.status == 'chart')
                .map(e => e.total_price)
                .reduce((a, b) => a + b, 0) + 50000,
            )}
          </Text>
        </View>
        <ButtonComponent
          type="text-icon"
          title="Checkout"
          padding={responsiveHeight(17)}
          fontSize={18}
          onPress={() => props.navigation.navigate('Checkout')}
        />
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  totalPrice1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  textBold: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.regular,
  },
  shipping: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
