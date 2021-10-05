import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  numberWithCommas,
  fonts,
  heightMobileUI,
} from '../../utils';
import {
  ButtonComponent,
  CardLiga,
  JerseySlider,
  Input,
  Picker,
  Distance,
} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
const JerseyDetail = props => {
  const {jersey} = props.route.params;
  return (
    // <ScrollView style={styles.scrollView}>
    <View style={styles.page}>
      <View style={styles.buttonBack}>
        <ButtonComponent
          onPress={() => props.navigation.goBack()}
          icon="arrow-left"
          padding={7}
        />
      </View>
      <JerseySlider images={jersey.image} />
      <View style={styles.container}>
        <View style={styles.liga}>
          <CardLiga liga={jersey.liga} />
        </View>
        <ScrollView style={styles.desc} showsVerticalScrollIndicator={false}>
          <Text style={styles.name}>{jersey.name}</Text>
          <Text style={styles.price}>
            Harga: {numberWithCommas(jersey.price)}
          </Text>
          <View style={styles.line} />
          <View style={styles.wrapperTypeAndWeight}>
            <Text style={styles.typeAndWeight}>Jenis: {jersey.type}</Text>
            <Text style={styles.typeAndWeight}>Berat: {jersey.weight}kg</Text>
          </View>
          <View style={styles.wrapperInput}>
            <Input
              label="Jumlah: "
              keyboardType="numeric"
              width={responsiveWidth(166)}
              height={responsiveHeight(43)}
              fontSize={13}
            />
            <Picker
              options={jersey.size}
              label="Pilih Ukuran: "
              width={responsiveWidth(166)}
              height={responsiveHeight(43)}
              fontSize={13}
              value={jersey.size[0]}
            />
          </View>
          <Input
            textarea
            label="Keterangan: "
            keyboardType="default"
            placeholder="Isi Jika Ingin Menambahkan Nama dan No Punggung"
            fontSize={13}
          />
          <Distance height={15} />
          <ButtonComponent
            type="text-icon"
            title="Masukkan Keranjang"
            icon="chart-white"
            padding={responsiveHeight(17)}
            onPress={() => props.navigation.navigate("Chart")}
          />
        </ScrollView>
      </View>
    </View>
    // </ScrollView>
  );
};

export default JerseyDetail;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollView: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: windowHeight,
  },
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    position: 'absolute',
    height: responsiveHeight(493),
    width: '100%',
    bottom: 0,
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 10,
    top: responsiveHeight(30),
    left: responsiveHeight(30),
  },
  liga: {
    alignItems: 'flex-end',
    marginTop: -30,
    marginRight: 30,
  },
  desc: {
    marginHorizontal: 30,
  },
  name: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.regular,
  },
  line: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  wrapperTypeAndWeight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  typeAndWeight: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
  },
  wrapperInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
