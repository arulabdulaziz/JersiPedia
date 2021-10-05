import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {HeaderMainApp} from '../../components';
import {ListLiga, ListJersey, Distance} from '../../components';
import {fonts, colors, responsiveHeight} from '../../utils';
const ListJerseyPage = (props) => {
  return (
    <View style={styles.page}>
      <HeaderMainApp />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.chooseLiga}>
          <ListLiga />
        </View>
        <View style={styles.listJersey}>
          <Text style={styles.label}>
            Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda
            Inginkan
          </Text>
          <ListJersey {...props}/>
        </View>
        <Distance height={+responsiveHeight(100)} />
      </ScrollView>
    </View>
  );
};

export default ListJerseyPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginTop: -30
  },
  chooseLiga: {
    marginHorizontal: 30,
  },
  listJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    marginBottom: 10,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});
