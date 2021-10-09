import React from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import {ListChart, Distance, ButtonComponent} from '../../components';
import {dummyOrders} from '../../data';
import {
  colors,
  responsiveHeight,
  fonts,
  heightMobileUI,
  numberWithCommas,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
const Chart = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dummyOrders.filter(e => e.status == 'chart')}
          renderItem={({item}) => <ListChart {...props} chart={item} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.totalPrice}>
          <Text style={styles.textBold}>Total Harga:</Text>
          <Text style={styles.textBold}>
            Rp.{' '}
            {numberWithCommas(
              dummyOrders
                .filter(e => e.status == 'chart')
                .map(e => e.total_price)
                .reduce((a, b) => a + b, 0),
            )}
          </Text>
        </View>
        <ButtonComponent
          type="text-icon"
          title="Checkout"
          padding={responsiveHeight(17)}
          fontSize={18}
          onPress={() => props.navigation.navigate('Checkout')}
        />
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
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
