import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {ButtonComponent, Input, Picker} from '../../components';
import {responsiveHeight, fonts, colors, responsiveWidth} from '../../utils';
import {dummyProfile} from '../../data';
import {getData} from '../../utils';
import {DefaultUser} from '../../assets';
import {getProvinceList, getCityList} from '../../store/actions';

const EditProfile = props => {
  const [provinceSelected, setProvinceSelected] = useState(null);
  const [citySelected, setCitySelected] = useState(null);
  const [dataUser, setDataUser] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    province_id: '',
    city_id: '',
    avatar: '',
  });
  const getDataUser = async () => {
    try {
      const data = await getData('user');
      console.log(data, 'data storage');
      if (data.name) setDataUser(data);
      else props.navigation.replace('Login');
    } catch (error) {
      // setDataUser(error);
    }
  };
  useEffect(() => {
    getDataUser();
    props.getProvinceList();
  }, []);
  useEffect(() => {
    console.log('provincee useeffect');
    if (dataUser.province_id) {
      props.getCityList(dataUser.province_id);
    }
  }, [dataUser.province_id]);
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label="Nama:"
          value={dataUser.name}
          onChangeText={value => setDataUser({...dataUser, name: value})}
        />
        <Input
          label="Email:"
          value={dataUser.email}
          onChangeText={value => setDataUser({...dataUser, email: value})}
        />
        <Input
          label="No Hp:"
          value={dataUser.phone}
          keyboardType="numeric"
          onChangeText={value => setDataUser({...dataUser, email: value})}
        />
        <Input
          label="Alamat:"
          textarea
          value={dataUser.address}
          onChangeText={value => setDataUser({...dataUser, address: value})}
        />
        <Picker
          type="province"
          label="Provinsi:"
          options={props.provinceList}
          value={dataUser.province_id}
          onChange={value =>
            setDataUser({...dataUser, province_id: value, city_id: ''})
          }
        />
        <Picker
          type="city"
          label="Kota/Kabupaten:"
          options={props.cityList}
          value={dataUser.city_id}
          onChange={value => setDataUser({...dataUser, city_id: value})}
        />
        <Text style={styles.text}>Foto Profile:</Text>
        <View style={styles.changeProfile}>
          <Image
            source={dataUser.avatar ? {uri: dataUser.avatar} : DefaultUser}
            style={styles.avatar}
          />
          <ButtonComponent
            padding={7}
            fontSize={18}
            type="text"
            title="Change Foto"
          />
        </View>
        <View style={styles.buttonSubmit}>
          <ButtonComponent
            padding={responsiveHeight(15)}
            fontSize={18}
            type="text-icon"
            title="Simpan"
            icon="submit"
            onPress={() => props.navigation.replace('MainApp')}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  provinceList: state.rajaOngkirReducer.getProvinceData,
  cityList: state.rajaOngkirReducer.getCityData,
  // dataUser: state.authReducer.registerData,
  // loading: state.authReducer.registerLoading,
  // error: state.authReducer.registerError,
});
const mapStateToDispatch = dispatch => ({
  getProvinceList: () => dispatch(getProvinceList()),
  getCityList: province_id => dispatch(getCityList(province_id)),
  // registerUser: (data, password) => dispatch(registerUser(data, password)),
});
export default connect(mapStateToProps, mapStateToDispatch)(EditProfile);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  buttonSubmit: {
    marginVertical: 30,
  },
  text: {
    marginVertical: 20,
    fontFamily: fonts.primary.regular,
    fontSize: 18,
  },
  avatar: {
    borderRadius: 40,
    width: responsiveWidth(150),
    height: responsiveHeight(150),
  },
  changeProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
