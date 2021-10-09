import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Logo, Ilustration} from '../../assets';
import {responsiveHeight, colors, fonts} from '../../utils';
import {Input, ButtonComponent, Distance} from '../../components';
const Login = props => {
  const {navigation} = props;
  return (
    <View style={styles.pages}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.logo}>
              <Logo />
            </View>
            <View style={styles.cardLogin}>
              <Input label="Email" />
              <Input label="Password" secureTextEntry />
              <Distance height={25} />
              <ButtonComponent
                type="text"
                padding={12}
                title="Login"
                fontSize={18}
              />
            </View>
            <View style={styles.register}>
              <Text style={styles.textBlue}>Belum Punya Akun ?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register1')}>
                <Text style={styles.textBlue}>Klik Untuk Daftar</Text>
              </TouchableOpacity>
            </View>
            <Distance height={200} />
            <View style={styles.ilustration}>
              <Ilustration />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    alignItems: 'center',
    marginTop: responsiveHeight(50),
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
  ilustration: {
    position: 'absolute',
    right: -100,
    bottom: 0,
    flex: 1,
  },
  register: {
    alignItems: 'center',
    marginTop: 10,
  },
  textBlue: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
});
