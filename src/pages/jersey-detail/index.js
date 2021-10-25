import React, {useState, useEffect} from 'react';
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
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getDetailLiga, deleteDetailLiga} from '../../store/actions';
import {unstable_continueExecution} from 'scheduler';
const JerseyDetail = props => {
  const {jersey} = props.route.params;
  const [sizeOptions, setSizeOptions] = useState(['S', 'M', 'L', 'XL', 'XXL']);
  const [size, setSize] = useState('L');
  const [amount, setAmount] = useState(1);
  const [note, setNote] = useState('');
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      props.getDetailLiga(jersey.liga);
    } else {
      props.deleteDetailLiga();
    }
  }, [isFocused]);
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
        {props.liga && (
          <View style={styles.liga}>
            <CardLiga liga={props.liga} navigation={props.navigation} route={props.route}/>
          </View>
        )}
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
              onChangeText={value => {
                if (value < 0 || !value) setAmount(1);
                else setAmount(+value);
              }}
              value={amount.toString()}
            />
            <Picker
              options={sizeOptions}
              label="Pilih Ukuran: "
              width={responsiveWidth(166)}
              height={responsiveHeight(43)}
              fontSize={13}
              value={size}
              onChange={value => setSize(value)}
            />
          </View>
          <Input
            textarea
            label="Keterangan: "
            keyboardType="default"
            placeholder="Isi Jika Ingin Menambahkan Nama dan No Punggung"
            fontSize={13}
            value={note}
            onChangeText={value => setNote(value)}
          />
          <Distance height={15} />
          <ButtonComponent
            type="text-icon"
            title="Masukkan Keranjang"
            icon="chart-white"
            padding={responsiveHeight(17)}
            onPress={() => props.navigation.navigate('Chart')}
          />
        </ScrollView>
      </View>
    </View>
    // </ScrollView>
  );
};
const mapStateToProps = state => ({
  liga: state.ligaReducer.detailLigaData,
  loadingLiga: state.ligaReducer.detailLigaLoading,
  ligaError: state.ligaReducer.detailLigaError,
});
const mapStateToDispatch = dispatch => ({
  deleteDetailLiga: () => dispatch(deleteDetailLiga()),
  getDetailLiga: id => dispatch(getDetailLiga(id)),
});
export default connect(mapStateToProps, mapStateToDispatch)(JerseyDetail);
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
