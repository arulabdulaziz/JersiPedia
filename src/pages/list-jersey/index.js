import React,{useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {HeaderMainApp} from '../../components';
import {ListLiga, ListJersey, Distance} from '../../components';
import {fonts, colors, responsiveHeight} from '../../utils';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getListJersey} from '../../store/actions';

const ListJerseyPage = props => {
  const isFocused = useIsFocused();
useEffect(() => {
  if (isFocused) {
    console.log('List Jersey ListJerseyPage');
    props.getListJersey();
  }
}, [isFocused]);
  return (
    <View style={styles.page}>
      <HeaderMainApp {...props} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.chooseLiga}>
          <ListLiga {...props}/>
        </View>
        <View style={styles.listJersey}>
          <Text style={styles.label}>
            Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda
            Inginkan
          </Text>
          <ListJersey {...props} />
        </View>
        <Distance height={+responsiveHeight(100)} />
      </ScrollView>
    </View>
  );
};
const mapStateToDispatch = dispatch => ({
  getListLiga: () => dispatch(getListLiga()),
  getListJersey: () => dispatch(getListJersey()),
});
export default connect(null, mapStateToDispatch)(ListJerseyPage);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginTop: -30,
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
