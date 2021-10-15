import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Logo, Ilustration} from '../../assets';
import {responsiveHeight, colors, fonts, getData} from '../../utils';
import {Input, ButtonComponent, Distance} from '../../components';
import {connect, useDispatch} from 'react-redux';
import {loginUser} from '../../store/actions';

const Login = props => {
  const {navigation, loading, dataUser} = props;
  const isFocused = useIsFocused();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const checkDataUser = async () => {
    try {
      if (isFocused) {
        if (dataUser) {
          navigation.replace('MainApp');
        } else {
          const storeData = await getData('user');
          if (storeData.name) {
            console.log(storeData, 'storage login');
            navigation.replace('MainApp');
          }
        }
      }
    } catch (error) {
      console.log(error, 'error get storage data');
    }
  };
  useEffect(() => {
    checkDataUser();
  }, [isFocused, dataUser]);
  const login = () => {
    if (email && password) {
      props.loginUser(email, password);
    } else {
      Alert.alert('Isi Email dan Password', 'email dan password wajib diisi!');
    }
  };
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
              <Input label="Email" onChangeText={value => setEmail(value)} />
              <Input
                label="Password"
                secureTextEntry
                onChangeText={value => setPassword(value)}
              />
              <Distance height={25} />
              <ButtonComponent
                type="text"
                padding={12}
                title="Login"
                fontSize={18}
                loading={loading}
                onPress={() => login()}
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
const mapStateToProps = state => ({
  dataUser: state.authReducer.loginData,
  loading: state.authReducer.loginLoading,
  error: state.authReducer.loginError,
});
const mapStateToDispatch = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});
export default connect(mapStateToProps, mapStateToDispatch)(Login);

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
