import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  heightMobileUI,
} from '../../utils';
import {dummyMenu} from '../../data';
import {RFValue} from 'react-native-responsive-fontsize';
import {ListMenu} from '../../components';
import {DefaultUser} from '../../assets';
import {getData} from '../../utils';
const Profile = props => {
  const [profile, setProfile] = useState({});
  const [menus, setMenus] = useState(dummyMenu);
  const isFocused = useIsFocused();
  const getDataUser = async () => {
    try {
      const data = await getData('user');
      if (data.name) setProfile(data);
      else props.navigation.replace('Login');
    } catch (error) {
      setProfile(error);
    }
  };
  useEffect(() => {
    if(isFocused){
      getDataUser();
    }
  }, [isFocused]);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
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
