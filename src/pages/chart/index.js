import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {ListChart, Distance, ButtonComponent} from '../../components';
import {
  colors,
  responsiveHeight,
  fonts,
  heightMobileUI,
  numberWithCommas,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {getListChart} from '../../store/actions';
import {getData} from '../../utils';
import {useIsFocused} from '@react-navigation/core';
const Chart = props => {
  const isFocused = useIsFocused();
  const onRefresh = React.useCallback(() => {
    getCharts();
  }, []);
  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);
  const getCharts = async () => {
    try {
      const user = await getData('user');
      if (user.uid) {
        props.getListChart(user.uid);
      } else {
        throw 'Silakan Login Untuk Melanjutkan';
      }
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
      props.navigation.replace('Login');
    }
  };
  return (
    <View style={styles.page}>

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={props.listChart?.orders ?? []}
          renderItem={({item}) => <ListChart {...props} orders={item} />}
          keyExtractor={item => item.uid}
          refreshControl={
            <RefreshControl refreshing={props.loading} onRefresh={onRefresh} />
          }
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.totalPrice}>
          <Text style={styles.textBold}>Total Harga:</Text>
          <Text style={styles.textBold}>
            Rp. {numberWithCommas(props.listChart?.total_price ?? 0)}
          </Text>
        </View>
        <ButtonComponent
          type="text-icon"
          title="Checkout"
          padding={responsiveHeight(17)}
          fontSize={18}
          onPress={() => props.navigation.navigate('Checkout')}
          loading={props.loading}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  loading: state.chartReducer.listChartLoading,
  listChart: state.chartReducer.listChartData,
  listChartError: state.chartReducer.listChartError,
});
const mapStateToDispatch = dispatch => ({
  getListChart: id => dispatch(getListChart(id)),
});
export default connect(mapStateToProps, mapStateToDispatch)(Chart);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.primary,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginBottom: responsiveHeight(180),
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  textBold: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.bold,
  },
});
