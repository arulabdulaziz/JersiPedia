import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {ButtonComponent, Input, Picker} from '../../components';
import {responsiveHeight, fonts, colors} from '../../utils';
import {dummyProfile} from '../../data';
const EditProfile = props => {
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
        <Input
          label="Alamat:"
          textarea
          value={dummyProfile.address}
        />

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
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  buttonSubmit: {
    marginVertical: 30,
  },
});
