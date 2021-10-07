import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CardMenu} from '../../small';

const ListMenu = ({menus, navigation}) => {
  return (
    <View>
      {menus.map(e => (
        <CardMenu menu={e} key={e.id} navigation={navigation}/>
      ))}
    </View>
  );
};

export default ListMenu;

const styles = StyleSheet.create({});
