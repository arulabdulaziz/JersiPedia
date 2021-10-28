import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  fonts,
  colors,
  heightMobileUI,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
  getData,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {ButtonComponent, CardAddress, Picker, Distance} from '../../components';
import {dummyOrders, dummyProfile} from '../../data';
import {useIsFocused} from '@react-navigation/core';
import {connect} from 'react-redux';
import { getProvinceList, getCityList } from '../../store/actions';
const Checkout = props => {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState({});
  const [address, setAddress] = useState({});
  const {total_weight, total_price} = props.route.params;
  const getDataUser = async () => {
    try {
      const data = await getData('user');
      // console.log(data, "data storage")
      if (data.name) {
        setProfile(data);
        setAddress({...address, address: data.address})
      } else props.navigation.replace('Login');
    } catch (error) {
      setProfile({});
    }
  };
  useEffect(() => {
    if (isFocused) {
      props.getProvinceList();
      getDataUser();
    }
  }, [isFocused]);
  useEffect(() => {
    if (profile.province_id) {
      props.getCityList(profile.province_id);
    }
  }, [profile.province_id]);
  useEffect(() => {
    if (props.provinceList.length != 0) {
      let province = props.provinceList.find(e => e.province_id == profile.province_id)
      if(province) province = province.province;
      setAddress({...address, province})
    }
  }, [profile.province_id, props.provinceList]);
  useEffect(() => {
    if (props.cityList.length != 0) {
      let city = props.cityList.find(e => e.city_id == profile.city_id);
      if (city) city = `${city.type} ${city.city_name}`;
      setAddress({...address, city});
    }
  }, [profile.city_id, props.cityList]);
  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {/* <Text>{JSON.stringify(profile)}</Text> */}
        {/* <Text>{JSON.stringify(props.route.params)}</Text> */}
        <Text style={styles.textBold}>Apakah Benar Alamat Ini ?</Text>
        <CardAddress {...props} profile={address} />
        <View style={styles.totalPrice1}>
          <Text style={styles.textBold}>Total Harga:</Text>
          <Text style={styles.textBold}>
            Rp. {numberWithCommas(total_price)}
          </Text>
        </View>
        <Picker options={[]} label="Pilih Expedisi:" />
        <Distance height={10} />
        <Text style={styles.textBold}>Biaya Ongkir</Text>
        <Distance height={10} />
        <View style={styles.shipping}>
          <Text style={styles.text}>
            Untuk Berat: {numberWithCommas(total_weight)} kg
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
const mapStateToProps = state => ({
  provinceList: state.rajaOngkirReducer.getProvinceData,
  cityList: state.rajaOngkirReducer.getCityData,
});
const mapStateToDispatch = dispatch => ({
  getProvinceList: () => dispatch(getProvinceList()),
  getCityList: province_id => dispatch(getCityList(province_id)),
});
export default connect(mapStateToProps, mapStateToDispatch)(Checkout);

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
