import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';
import {ButtonComponent, Input, Picker} from '../../components';
import {responsiveHeight, fonts, colors, responsiveWidth} from '../../utils';
import {getData} from '../../utils';
import {DefaultUser} from '../../assets';
import {getProvinceList, getCityList} from '../../store/actions';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateProfile} from '../../store/actions';
const EditProfile = props => {
  const {loading, updateProfileData} = props;
  const [avatarBase64, setAvatarBase64] = useState('');
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
  const [updateProfile, setUpdateProfile] = useState(updateProfileData);
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
    console.log(updateProfileData, 'updateProfileData');
    if (updateProfileData && updateProfileData != updateProfile) {
      Alert.alert("Sukses", "Update Profile Sukses")
      props.navigation.replace('MainApp');
    } else if (updateProfileData) {
      setUpdateProfile(updateProfileData);
    }
  }, [updateProfileData]);
  useEffect(() => {
    if (dataUser.province_id) {
      props.getCityList(dataUser.province_id);
    }
  }, [dataUser.province_id]);
  const getImage = () => {
    launchImageLibrary(
      {
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        includeBase64: true,
        selectionLimit: 1,
        cameraType: 'front',
      },
      response => {
        const {didCancel, errorCode, errorMessage} = response;
        if (didCancel || errorCode || errorMessage) {
          Alert.alert('Error', 'Maaf sepertinya kamu tidak memilih foto');
        } else {
          // console.log(response, 'response');
          const image = response.assets[0];
          const uri = image.uri;
          const base64 = `data:${image.type};base64,${image.base64}`;
          // console.log(uri, base64);
          console.log(dataUser, 'datUser');
          setDataUser({
            ...dataUser,
            avatar: uri,
          });
          setAvatarBase64(base64);
        }
      },
    );
  };
  const submit = () => {
    const payload = {
      ...dataUser,
    };
    if (avatarBase64) payload.avatar = avatarBase64;
    // console.log(payload, "payload")
    props.updateProfile(payload);
  };
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
          disabled
          value={dataUser.email}
          // onChangeText={value => setDataUser({...dataUser, email: value})}
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
            onPress={() => getImage()}
          />
        </View>
        <View style={styles.buttonSubmit}>
          <ButtonComponent
            padding={responsiveHeight(15)}
            fontSize={18}
            type="text-icon"
            title="Simpan"
            icon="submit"
            onPress={() => submit()}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  provinceList: state.rajaOngkirReducer.getProvinceData,
  cityList: state.rajaOngkirReducer.getCityData,
  updateProfileData: state.updateProfileReducer.updateProfileData,
  loading: state.updateProfileReducer.updateProfileLoading,
  error: state.updateProfileReducer.updateProfileError,
});
const mapStateToDispatch = dispatch => ({
  getProvinceList: () => dispatch(getProvinceList()),
  getCityList: province_id => dispatch(getCityList(province_id)),
  updateProfile: data => dispatch(updateProfile(data)),
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
