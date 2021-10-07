import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';
const CardAddress = ({profile, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alamat Saya :</Text>
      <Text style={styles.address}>{profile.address}</Text>
      <Text style={styles.address}>Kota/Kab. {profile.city}</Text>
      <Text style={styles.address}>Provinsi {profile.province}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.changeAddress}>Ubah Alamat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    marginBottom: 5,
  },
  address: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  changeAddress: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'right',
  },
});
