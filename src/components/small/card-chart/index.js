import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {IconDelete} from '@assets';
import {
  colors,
  fonts,
  responsiveWidth,
  responsiveHeight,
  numberWithCommas,
} from '@utils';
import {Distance} from '..';
import {connect} from 'react-redux';
import {deleteChart} from '@store/actions';
import Spinner from 'react-native-loading-spinner-overlay';

const CardChart = props => {
  const {chart, onPress} = props;
  const removeChart = () => {
    props.deleteChart(chart);
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={props.deleteChartLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        color={colors.primary}
      />
      {/* <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image source={jersey.image[0]} style={styles.image} />
        <Text style={styles.label}>{jersey.name}</Text>
      </TouchableOpacity>
      <ButtonComponent
        type="text"
        title="Detail"
        padding={7}
        fontSize={13}
        onPress={onPress}
      /> */}
      <Image
        source={chart.product.image[0] ? {uri: chart.product.image[0]} : ''}
        style={styles.image}
      />
      <View>
        <View>
          <Text style={styles.name}>{chart.product.name}</Text>
          <Text style={styles.text}>
            Rp. {numberWithCommas(chart.product.price)}
          </Text>
        </View>
        <Distance height={responsiveHeight(14)} />
        <View>
          <Text style={styles.textBold}>
            Pesan: <Text style={styles.text}>{chart.total_order}</Text>
          </Text>
          <Text style={styles.textBold}>
            Ukuran: <Text style={styles.text}>{chart.size}</Text>
          </Text>
          <Text style={styles.textBold}>
            Total Harga:{' '}
            <Text style={styles.text}>
              {numberWithCommas(chart.total_price)}
            </Text>
          </Text>
          <Text style={styles.textBold}>Keterangan:</Text>
          <Text style={styles.text}>{chart.desc}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconDelete} onPress={() => removeChart()}>
        <IconDelete />
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = state => ({
  deleteChartLoading: state.chartReducer.deleteChartLoading,
});
const mapStateToDispatch = dispatch => ({
  deleteChart: chart => dispatch(deleteChart(chart)),
});
export default connect(mapStateToProps, mapStateToDispatch)(CardChart);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.primary,
  },
  container: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: colors.yellow,
    width: responsiveWidth(150),
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: responsiveWidth(77),
    height: responsiveHeight(88),
    resizeMode: 'contain',
  },
  label: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  iconDelete: {
    alignItems: 'flex-end',
    flex: 1,
  },
  name: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 11,
  },
  textBold: {
    fontFamily: fonts.primary.bold,
    fontSize: 11,
  },
});
