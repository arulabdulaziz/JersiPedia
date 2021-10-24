import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {CardJersey, Distance} from '../..';
import {responsiveHeight} from '../../../utils';
import {connect} from 'react-redux';
import {colors} from '../../../utils';
const ListJersey = props => {
  const [jerseys, setJerseys] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);
  // useEffect(() => {
  //   // setJerseys(dummyJerseys);
  // }, []);
  return (
    <View style={styles.container}>
      {/* {jerseys.map(jersey => (
        <CardJersey key={jersey.id} jersey={jersey} onPress={() => props.navigation.navigate("JerseyDetail", {jersey})}/>
      ))} */}
      {/* <FlatList
        contentContainerStyle={styles.container2}
        data={jerseys}
        // numColumns={3}
        renderItem={({item}) => (
          <CardJersey
            jersey={item}
            onPress={() => props.navigation.navigate('JerseyDetail', {item})}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> */}
      {props.jerseyLoading ? (
        <View style={styles.textCenter}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : props.jerseyError ? (
        <View style={styles.textCenter}>
          <Text>{props.jerseyError}</Text>
        </View>
      ) : props.listJersey ? (
        <FlatList
          contentContainerStyle={styles.container2}
          data={Object.keys(props.listJersey).map(e => ({
            ...props.listJersey[e],
            uid: e,
          }))}
          // numColumns={3}
          renderItem={({item}) => (
            <CardJersey
              jersey={item}
              onPress={() => props.navigation.navigate('JerseyDetail', {jersey: item})}
            />
          )}
          keyExtractor={item => item.uid}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.textCenter}>
          <Text style={styles.textCenter}>Data Kosong</Text>
        </View>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  listJersey: state.jerseyReducer.listJerseyData,
  jerseyError: state.jerseyReducer.listJerseyError,
  jerseyLoading: state.jerseyReducer.listJerseyLoading,
});
export default connect(mapStateToProps)(ListJersey);

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  container2: {
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  textCenter: {
    alignItems: 'center',
    textAlign: 'center',
    width: "100%",
  },
});
