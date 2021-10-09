import React, {useState} from 'react';
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
import {IlustrationRegister2} from '../../assets';
import {Distance, ButtonComponent, Input, Picker} from '../../components';
import {responsiveHeight, responsiveWidth, colors, fonts} from '../../utils';
const Register2 = props => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  return (
    <View style={styles.page}>
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
                  label="Provinsi :"
                  options={provinces}
                  value="Jawa Tengah"
                />
                <Picker
                  label="Kota / Kabupaten :"
                  options={cities}
                  value="Semarang"
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

export default Register2;

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
