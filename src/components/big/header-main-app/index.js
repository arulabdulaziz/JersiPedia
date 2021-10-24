import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, responsiveHeight, fonts} from '../../../utils';
import {IconSearch} from '../../../assets';
import {Distance} from '../../small';
import {ButtonComponent} from '../../small';
import {connect} from 'react-redux';
import {setKeyword, deleteLiga} from '../../../store/actions';
import {useIsFocused} from '@react-navigation/native';

const HeaderMainApp = props => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (props.route.name == 'ListJersey') setSearch(props.keyword);
    else setSearch('');
  }, [isFocused, props.keyword]);
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
            value={search}
            onChangeText={value => setSearch(value)}
            onSubmitEditing={() => finishSearch()}
          />
        </View>
        <Distance width={10} />
        <ButtonComponent
          padding={10}
          onPress={() => props.navigation.navigate('Chart')}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  keyword: state.jerseyReducer.keyword,
});
const mapStateToDispatch = dispatch => ({
  setKeyword: keyword => dispatch(setKeyword(keyword)),
  deleteLiga: () => dispatch(deleteLiga()),
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
  },
});
