import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';
import {ButtonComponent, Input} from '@components';
import {
  responsiveHeight,
  fonts,
  colors,
  responsiveWidth,
  getData,
} from '@utils';
import {connect} from 'react-redux';
import FIREBASE from '@config/FIREBASE';
const ChangePassword = props => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const submit = () => {
    if (
      password.length < 8 ||
      newPassword.length < 8 ||
      newPasswordConfirmation.length < 8
    ) {
      alert(
        'Password Lama, Password Baru, Konfirmasi Password Baru Minimal 8 Karakter!',
      );
    } else if (newPassword == password) {
      alert('Password Baru Tidak Boleh Sama Dengan Password Lama!');
    } else if (newPassword != newPasswordConfirmation) {
      alert('Password Baru dan Konfirmasi Password Baru Harus Sama!');
    } else {
      setLoading(true);
      const payload = {
        password,
        newPassword,
      };
      getData('user')
        .then(res => {
          payload.email = res.email
          return FIREBASE.auth().signInWithEmailAndPassword(
            payload.email,
            payload.password,
          );
        })
        .then(response => {
          //jika sukses maka update password
          FIREBASE.auth().currentUser.updatePassword(payload.newPassword);
        })
        .then(function () {
          // Update successful.
          props.navigation.replace("MainApp")
          Alert.alert('Sukses', 'Sukses Mengganti Password');
        })
        .catch(error => {
          const errorMessage = error?.message;
          if (errorMessage) Alert.alert('Error', error.message);
          else Alert.alert('Error', JSON.stringify(error));
        })
        .finally(_ => {
          setLoading(false);
        });
    }
  };
  return (
    <View style={styles.page}>
      <View>
        <Input
          label="Password Lama:"
          secureTextEntry
          value={password}
          onChangeText={value => setPassword(value)}
        />
        <Input
          label="Password Baru:"
          secureTextEntry
          value={newPassword}
          onChangeText={value => setNewPassword(value)}
        />
        <Input
          label="Konfirmasi Password Baru:"
          secureTextEntry
          value={newPasswordConfirmation}
          onChangeText={value => setNewPasswordConfirmation(value)}
        />
      </View>
      <View style={styles.buttonSubmit}>
        <ButtonComponent
          padding={responsiveHeight(15)}
          loading={loading}
          fontSize={18}
          type="text-icon"
          title="Simpan"
          icon="submit"
          onPress={() => submit()}
        />
      </View>
    </View>
  );
};

export default connect()(ChangePassword);

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
