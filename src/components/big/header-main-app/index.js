import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, responsiveHeight, fonts, getData} from '@utils';
import {IconSearch} from '@assets';
import {Distance} from '@components/small';
import {ButtonComponent} from '@components/small';
import {connect} from 'react-redux';
import {setKeyword, deleteLiga, getListChart} from '@store/actions';
import {useIsFocused} from '@react-navigation/native';
const HeaderMainApp = props => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [notif, setNotif] = useState(0);
  useEffect(() => {
    if (props.route.name == 'ListJersey') setSearch(props.keyword);
    else setSearch('');
  }, [isFocused, props.keyword]);
  useEffect(() => {
    if (isFocused) {
      if (props.listChart) {
        if (props.listChart.orders) setNotif(props.listChart.orders.length);
        else setNotif(0);
      } else {
        setNotif(0);
        getCharts();
      }
    }
  }, [isFocused, props.listChart]);
  const getCharts = async () => {
    try {
      const user = await getData('user');
      if (user.uid) {
        props.getListChart(user.uid);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const finishSearch = () => {
    props.setKeyword(search);
    if (props.route.name != 'ListJersey')
      props.navigation.navigate('ListJersey');
    else props.getListJersey();
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.searchSection}>
          <IconSearch />
          <TextInput
            style={styles.input}
            placeholder="Cari Jersey. . ."
            placeholderTextColor={colors.border}
            value={search}
            onChangeText={value => setSearch(value)}
            onSubmitEditing={() => finishSearch()}
          />
        </View>
        <Distance width={10} />
        <ButtonComponent
          padding={10}
          onPress={() => props.navigation.navigate('Chart')}
          totalChart={notif}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  keyword: state.jerseyReducer.keyword,
  listChart: state.chartReducer.listChartData,
});
const mapStateToDispatch = dispatch => ({
  setKeyword: keyword => dispatch(setKeyword(keyword)),
  deleteLiga: () => dispatch(deleteLiga()),
  getListChart: id => dispatch(getListChart(id)),
});
export default connect(mapStateToProps, mapStateToDispatch)(HeaderMainApp);

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(125),
    backgroundColor: colors.primary,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 30,
  },
  searchSection: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 5,
    paddingLeft: 12,
    alignItems: 'center',
  },
  input: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: 'black'
  },
});
