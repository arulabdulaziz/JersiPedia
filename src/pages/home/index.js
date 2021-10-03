import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {HeaderMainApp, ImageSlider} from '../../components';
import {ListLiga, ListJersey, Distance} from '../../components';
import {fonts, colors, responsiveHeight} from '../../utils';
import {ButtonComponent} from '../../components';
const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMainApp />
        <ImageSlider />
        <View style={styles.chooseLiga}>
          <Text style={styles.label}>Pilih Liga</Text>
          <ListLiga />
        </View>
        <View style={styles.chooseLiga}>
          <Text style={styles.label}>
            Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda
            Inginkan
          </Text>
          <ListJersey />
          <ButtonComponent type="text" padding={7} title="Lihat Semua" />
        </View>
        <Distance height={+responsiveHeight(130)} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chooseLiga: {
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
