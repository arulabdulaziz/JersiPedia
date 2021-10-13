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
  Alert,
} from 'react-native';
import {IlustrationRegister1} from '../../assets';
import {Distance, ButtonComponent, Input} from '../../components';
import {responsiveHeight, responsiveWidth, colors, fonts} from '../../utils';
const Register1 = props => {
  const [province, setProvince] = useState([]);
  const [cities, setCities] = useState([]);
  const [dataUser, setDataUser] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const onContinue = () => {
    const {name, email, phone, password} = dataUser;
    if(name && email && phone && password){
      props.navigation.navigate("Register2",dataUser)
    }else{
      Alert.alert("Isi Data Diri!","Nama, Email, No Hp, dan Password harus diisi!")
    }
  }
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
                onPress={() => props.navigation.navigate('Login')}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.ilustration}>
                <IlustrationRegister1 />
              </View>
              <View style={styles.title}>
                <Text style={styles.textTitle}>Daftar</Text>
                <Text style={styles.textTitle}>Isi Data Diri Anda</Text>
              </View>
              <View style={styles.wrapperCircle}>
                <View style={styles.circlePrimary}></View>
                <Distance width={10} />
                <View style={styles.circleDisabled}></View>
              </View>
              <View style={styles.cardLogin}>
                <Input
                  label="Name:"
                  onChangeText={value =>
                    setDataUser({...dataUser, name: value})
                  }
                />
                <Input
                  label="Email:"
                  onChangeText={value =>
                    setDataUser({...dataUser, email: value})
                  }
                />
                <Input
                  label="No Hp:"
                  keyboardType="numeric"
                  onChangeText={value =>
                    setDataUser({...dataUser, phone: value})
                  }
                />
                <Input
                  label="Password"
                  secureTextEntry
                  onChangeText={value =>
                    setDataUser({...dataUser, password: value})
                  }
                />
                <Distance height={25} />
                <ButtonComponent
                  type="text-icon"
                  icon="submit"
                  padding={12}
                  title="Lanjutkan"
                  fontSize={18}
                  onPress={() => onContinue()}
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

export default Register1;

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
