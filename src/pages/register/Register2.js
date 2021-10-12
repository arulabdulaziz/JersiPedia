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
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {IlustrationRegister2} from '../../assets';
import {Distance, ButtonComponent, Input, Picker} from '../../components';
import {responsiveHeight, responsiveWidth, colors, fonts} from '../../utils';
import {getProvinceList, getCityList} from '../../store/actions/raja-ongkir';
const Register2 = props => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  // const dispatch = useDispatch()
  const [provinceSelected, setProvinceSelected] = useState(null);
  const [citySelected, setCitySelected] = useState(null);
  useEffect(() => {
    props.getProvinceList();
    // dispatch(getProvinceList());
  }, []);
  useEffect(() => {
    setCitySelected(null);
    if (provinceSelected) {
      props.getCityList(provinceSelected.province_id);
    }
  }, [provinceSelected]);
  return (
    <View style={styles.page}>
      {/* <Text>{JSON.stringify(provinceSelected)}</Text> */}
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
                <Text style={styles.textTitle}>Daftar</Text>
                <Text style={styles.textTitle}>Isi Data Diri Anda</Text>
              </View>
              <View style={styles.wrapperCircle}>
                <View style={styles.circleDisabled}></View>
                <Distance width={10} />
                <View style={styles.circlePrimary}></View>
              </View>
              <View style={styles.cardLogin}>
                <Input label="Alamat :" textarea />
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
                  onPress={() => props.navigation.navigate('MainApp')}
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
});
const mapStateToDispatch = dispatch => ({
  getProvinceList: () => dispatch(getProvinceList()),
  getCityList: province_id => dispatch(getCityList(province_id)),
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
