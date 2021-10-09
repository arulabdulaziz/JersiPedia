import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {ButtonComponent, Input} from '../../components';
import {responsiveHeight, fonts, colors, responsiveWidth} from '../../utils';

const ChangePassword = props => {
  return (
    <View style={styles.page}>
      <View>
        <Input label="Password Lama:" secureTextEntry />
        <Input label="Password Baru:" secureTextEntry />
        <Input label="Konfirmasi Password Baru:" secureTextEntry />
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
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  buttonSubmit: {
    marginVertical: 30,
  },
});
