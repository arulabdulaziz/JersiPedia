import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  heightMobileUI,
  getData,
} from '@utils';
import {dummyMenu} from '@data';
import {RFValue} from 'react-native-responsive-fontsize';
import {ListMenu} from '@components';
import {DefaultUser} from '@assets';
import Spinner from 'react-native-loading-spinner-overlay';

const Profile = props => {
  const [profile, setProfile] = useState({});
  const [menus, setMenus] = useState(dummyMenu);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const getDataUser = async () => {
    try {
      setLoading(true);
      const data = await getData('user');
      // console.log(data, "data storage")
      if (data.name) setProfile(data);
      else props.navigation.replace('Login');
    } catch (error) {
      setProfile(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      if (!profile.uid) {
        getDataUser();
      }
    }
  }, [isFocused]);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color={colors.primary}
        />
        <Image
          source={profile.avatar ? {uri: profile.avatar} : DefaultUser}
          style={styles.avatar}
        />
        <View style={styles.profile}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.desc}>No. HP : {profile.phone}</Text>
          <Text style={styles.desc}>{profile.address}</Text>
        </View>
        <ListMenu menus={menus} navigation={props.navigation} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.primary,
  },
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: responsiveHeight(700),
    bottom: 0,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: -responsiveHeight(75),
    borderRadius: 40,
    width: responsiveWidth(150),
    height: responsiveHeight(150),
  },
  profile: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
  },
  desc: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.regular,
  },
});
