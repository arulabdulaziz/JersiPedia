import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {IlustrationRegister2} from '../../assets';
import {Distance, ButtonComponent, Input, Picker} from '../../components';
import {responsiveHeight, responsiveWidth, colors, fonts} from '../../utils';
import {getProvinceList, getCityList, registerUser} from '../../store/actions';
const Register2 = props => {
  const [provinceSelected, setProvinceSelected] = useState(null);
  const [citySelected, setCitySelected] = useState(null);
  const [address, setAddress] = useState('');
  const {name, email, phone, password} = props.route.params;
  const {dataUser, loading, error} = props;
  useEffect(() => {
    if (!name || !email || !phone || !password) {
      props.navigation.replace('Register1');
    } else {
      props.getProvinceList();
    }
    // dispatch(getProvinceList());
  }, []);
  useEffect(() => {
    setCitySelected(null);
    if (provinceSelected) {
      props.getCityList(provinceSelected.province_id);
    }
  }, [provinceSelected]);
  useEffect(() => {
    if (dataUser) {
      props.navigation.replace('MainApp');
    }
  }, [dataUser]);
  const onContinue = () => {
    if (address && provinceSelected && citySelected) {
      const data = {
        name,
        email,
        phone,
        address,
        province_id: provinceSelected.province_id,
        city_id: citySelected.city_id,
      };
      // console.log(data, password);
      props.registerUser(data, password);
    } else {
      Alert.alert(
        'Isi Alamat Anda!',
        'Alamat, Provinsi, dan Kota harus diisi!',
      );
    }
  };
  return (
    <View style={styles.page}>
      {/* <Text>{JSON.stringify(props.route.params)}</Text> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.buttonBack}>
              <ButtonComponent
                icon="arrow-left"
                padding={7}
                onPress={() => props.navigation.navigate('Register1')}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.ilustration}>
                <IlustrationRegister2 />
              </View>
              <View style={styles.title}>
                <Text style={styles.textTitle}>Isi Alamat</Text>
                <Text style={styles.textTitle}>Lengkap Anda</Text>
              </View>
              <View style={styles.wrapperCircle}>
                <View style={styles.circleDisabled}></View>
                <Distance width={10} />
                <View style={styles.circlePrimary}></View>
              </View>
              <View style={styles.cardLogin}>
                <Input
                  label="Alamat :"
                  textarea
                  onChangeText={value => setAddress(value)}
                />
                <Picker
                  type="province"
                  label="Provinsi :"
                  options={props.provinceList}
                  value={provinceSelected}
                  onChange={value => setProvinceSelected(value)}
                />
                <Picker
                  type="city"
                  label="Kota / Kabupaten :"
                  options={props.cityList}
                  value={citySelected}
                  onChange={value => setCitySelected(value)}
                />
                <Distance height={25} />
                <ButtonComponent
                  type="text-icon"
                  icon="submit"
                  padding={12}
                  title="Lanjutkan"
                  fontSize={18}
                  onPress={() => onContinue()}
                  loading={loading}
                />
              </View>
              <Distance height={100} />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
const mapStateToProps = state => ({
  provinceList: state.rajaOngkirReducer.getProvinceData,
  cityList: state.rajaOngkirReducer.getCityData,
  dataUser: state.authReducer.registerData,
  loading: state.authReducer.registerLoading,
  error: state.authReducer.registerError,
});
const mapStateToDispatch = dispatch => ({
  getProvinceList: () => dispatch(getProvinceList()),
  getCityList: province_id => dispatch(getCityList(province_id)),
  registerUser: (data, password) => dispatch(registerUser(data, password)),
});
export default connect(mapStateToProps, mapStateToDispatch)(Register2);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  ilustration: {
    marginTop: responsiveHeight(50),
    alignItems: 'center',
  },
  title: {
    marginTop: responsiveHeight(20),
  },
  textTitle: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
    textAlign: 'center',
  },
  cardLogin: {
    marginHorizontal: 30,
    padding: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 30,
    borderRadius: 10,
    marginTop: responsiveHeight(30),
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.border,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  buttonBack: {
    marginLeft: 20,
    marginTop: 10,
  },
});
