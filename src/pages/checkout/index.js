import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import {
  fonts,
  colors,
  heightMobileUI,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
  getData,
  HEADER_MIDTRANS,
  URL_MIDTRANS,
  URL_MIDTRANS_STATUS,
  API_TIMEOUT,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {ButtonComponent, CardAddress, Picker, Distance} from '../../components';
import {useIsFocused} from '@react-navigation/core';
import {connect} from 'react-redux';
import {
  getProvinceList,
  getCityList,
  getCourierList,
  getShippingCost,
  resetShippingCost,
} from '../../store/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
const Checkout = props => {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState({});
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [courierSelected, setCourierSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const {total_weight, total_price} = props.route.params;
  const getDataUser = async () => {
    try {
      setLoading(true);
      const data = await getData('user');
      // console.log(data, "data storage")
      if (data.name) {
        setProfile(data);
      } else props.navigation.replace('Login');
    } catch (error) {
      setProfile({});
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    props.resetShippingCost();
    if (isFocused) {
      if (props.provinceList.length == 0) props.getProvinceList();
      getDataUser();
      if (props.courierList.length == 0) props.getCourierList();
    }
  }, [isFocused]);
  useEffect(() => {
    if (courierSelected && courierSelected.id) {
      const data = {
        total_weight,
        profile,
      };
      props.getShippingCost(data, courierSelected);
    }
  }, [courierSelected]);
  useEffect(() => {
    if (profile.province_id) {
      if (
        props.cityList.length == 0 &&
        props.provinceSelected != profile.province_id
      )
        props.getCityList(profile.province_id);
    }
  }, [profile.province_id]);
  useEffect(() => {
    if (props.provinceList.length != 0 && profile.province_id) {
      let province = props.provinceList.find(
        e => e.province_id == profile.province_id,
      );
      if (province) province = province.province;
      setProvince(province);
    }
  }, [profile.province_id, props.provinceList]);
  useEffect(() => {
    if (props.cityList.length != 0) {
      let city = props.cityList.find(e => e.city_id == profile.city_id);
      if (city) city = `${city.type} ${city.city_name}`;
      setCity(city);
    }
  }, [profile.city_id, props.cityList]);
  const submit = () => {
    if (courierSelected && courierSelected.id) {
      setLoading(true);

      let date = new Date().toISOString();
      const dateFront = date.split("T")[0]
      const dateBack = date.split("T")[1].split(".")[0]
      date = `${dateFront}/${dateBack}`
      const data = {
        transaction_details: {
          order_id: 'T-' + date + '-' + profile.uid,
          gross_amount: parseInt(
            total_price + Number(props.shippingCostData?.cost?.value ?? 0),
          ),
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: profile.name,
          email: profile.email,
          phone: profile.phone,
        },
      };
      axios({
        method: 'POST',
        url: URL_MIDTRANS + 'transactions',
        headers: HEADER_MIDTRANS,
        data: data,
        timeout: +API_TIMEOUT,
      })
        .then(res => {
          alert(JSON.stringify(res)+"<<<<<<<<<<");
        })
        .catch(err => {
          console.log(JSON.stringify(err))
          console.log("+++++++++")
          const errorMessage = err.message ? err.message : JSON.stringify(err);
          Alert.alert('Error', errorMessage);
        }).finally(_ => {
          setLoading(false)
        });
    } else {
      alert('Sialakan Pilih Jasa Expedisi');
    }
  };
  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        <Spinner
          visible={
            loading ||
            props.loadingProvince ||
            props.loadingCity ||
            props.loadingCourier ||
            props.shippingCostLoading
          }
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color={colors.primary}
        />
        {/* <Text>{JSON.stringify(props.shippingCostData)}</Text> */}
        <Text style={styles.textBold}>Apakah Benar Alamat Ini ?</Text>
        <CardAddress
          {...props}
          profile={{address: profile.address, province, city}}
        />
        <View style={styles.totalPrice1}>
          <Text style={styles.textBold}>Total Harga:</Text>
          <Text style={styles.textBold}>
            Rp. {numberWithCommas(total_price)}
          </Text>
        </View>
        <Picker
          options={props.courierList}
          label="Pilih Expedisi:"
          type="courier"
          value={courierSelected}
          onChange={value => setCourierSelected(value)}
        />
        <Distance height={10} />
        <Text style={styles.textBold}>Biaya Ongkir</Text>
        <Distance height={10} />
        <View style={styles.shipping}>
          <Text style={styles.text}>
            Untuk Berat: {numberWithCommas(total_weight)} kg
          </Text>
          <Text style={styles.textBold}>
            Rp.{' '}
            {numberWithCommas(Number(props.shippingCostData?.cost?.value ?? 0))}
          </Text>
        </View>
        <Distance height={5} />
        <View style={styles.shipping}>
          <Text style={styles.text}>Estimasi Waktu</Text>
          <Text style={styles.textBold}>
            {props.shippingCostData
              ? `${(props.shippingCostData?.cost?.etd ?? '')
                  .replace('HARI', '')
                  .replace('Hari', '')
                  .replace('hari', '')} Hari`
              : '-'}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalPrice}>
          <Text style={styles.textBold}>Total Harga:</Text>
          <Text style={styles.textBold}>
            Rp.{' '}
            {numberWithCommas(
              total_price + Number(props.shippingCostData?.cost?.value ?? 0),
            )}
          </Text>
        </View>
        <ButtonComponent
          loading={loading}
          type="text-icon"
          title="Checkout"
          padding={responsiveHeight(17)}
          fontSize={18}
          onPress={() => submit()}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  provinceList: state.rajaOngkirReducer.getProvinceData,
  loadingProvince: state.rajaOngkirReducer.getProvinceLoading,
  errorProvince: state.rajaOngkirReducer.getProvinceError,
  provinceSelected: state.rajaOngkirReducer.provinceSelected,

  cityList: state.rajaOngkirReducer.getCityData,
  loadingCity: state.rajaOngkirReducer.getCityLoading,
  errorCity: state.rajaOngkirReducer.getCityError,

  courierList: state.rajaOngkirReducer.getCouriesData,
  loadingCourier: state.rajaOngkirReducer.getCouriesLoading,
  errorCourier: state.rajaOngkirReducer.getCouriesError,

  shippingCostData: state.rajaOngkirReducer.getShippingCostData,
  shippingCostLoading: state.rajaOngkirReducer.getShippingCostLoading,
  shippingCostError: state.rajaOngkirReducer.getShippingCostError,
});
const mapStateToDispatch = dispatch => ({
  getProvinceList: () => dispatch(getProvinceList()),
  getCityList: province_id => dispatch(getCityList(province_id)),
  getCourierList: () => dispatch(getCourierList()),
  getShippingCost: (data, courier) => dispatch(getShippingCost(data, courier)),
  resetShippingCost: () => dispatch(resetShippingCost()),
});
export default connect(mapStateToProps, mapStateToDispatch)(Checkout);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.primary,
  },
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
