import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CardLiga} from '../../small';
import {useIsFocused} from '@react-navigation/native';
import {getListLiga} from '../../../store/actions';
import {connect} from 'react-redux';
import {colors, responsiveWidth, widthMobileUI} from '../../../utils';

const ListLiga = props => {
  const [ligas, setLigas] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    // console.log('getList Liga', ligas);
    // console.log('getList Liga1', props.listLiga);
    if (!props.listLiga && isFocused) {
      props.getListLiga();
    } else if (props.listLiga && isFocused) {
      const keys = Object.keys(props.listLiga);
      setLigas(keys.map(e => props.listLiga[e]));
    }
  }, [props.listLiga, isFocused]);
  // useEffect(() => {
  //   console.log('List Liga');

  // }, []);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* {ligas.map(liga => (
          <CardLiga key={liga.image} liga={liga} />
        ))} */}
        {props.ligaLoading ? (
          <View style={styles.textCenter}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : props.ligaError ? (
          <View style={styles.textCenter}>
            <Text>{props.ligaError}</Text>
          </View>
        ) : ligas.length > 0 ? (
          ligas.map(liga => <CardLiga key={liga.image} liga={liga} />)
        ) : (
          <View style={styles.textCenter}>
            <Text style={styles.textCenter}>Data Kosong</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => ({
  listLiga: state.ligaReducer.listLigaData,
  ligaError: state.ligaReducer.listLigaError,
  ligaLoading: state.ligaReducer.listLigaLoading,
});
const mapStateToDispatch = dispatch => ({
  getListLiga: () => dispatch(getListLiga()),
});
export default connect(mapStateToProps, mapStateToDispatch)(ListLiga);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textCenter: {
    alignItems: 'center',
    textAlign: 'center',
    width: responsiveWidth(widthMobileUI),
  },
});
