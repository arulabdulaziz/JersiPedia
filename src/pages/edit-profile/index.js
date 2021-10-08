import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {ButtonComponent, Input, Picker} from '../../components';
import {responsiveHeight, fonts, colors, responsiveWidth} from '../../utils';
import {dummyProfile} from '../../data';
const EditProfile = props => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input label="Nama:" value={dummyProfile.name} />
        <Input label="Email:" value={dummyProfile.email} />
        <Input
          label="No Hp:"
          value={dummyProfile.phone}
          keyboardType="numeric"
        />
        <Input label="Alamat:" textarea value={dummyProfile.address} />
        <Picker
          label="Provinsi:"
          options={provinces}
          value={dummyProfile.province}
        />
        <Picker
          label="Kota/Kabupaten:"
          options={cities}
          value={dummyProfile.city}
        />
        <Text style={styles.text}>Foto Profile:</Text>
        <View style={styles.changeProfile}>
          <Image source={dummyProfile.avatar} style={styles.avatar} />
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
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
