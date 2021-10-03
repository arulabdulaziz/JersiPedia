import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {HeaderMainApp, ImageSlider} from '../../components';
import {ListLiga, ListJersey, Distance} from '../../components';
import {fonts, colors, responsiveHeight} from '../../utils';
const Home = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMainApp />
        <ImageSlider />
        <View style={styles.chooseLiga}>
          <Text style={styles.label}>Pilih Liga</Text>
          <ListLiga />
        </View>
        <View style={styles.chooseLiga}>
          <Text style={styles.label}>
            Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda Inginkan
          </Text>
          <ListJersey />
        </View>
        <Distance height={+responsiveHeight(100)} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  chooseLiga: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});
