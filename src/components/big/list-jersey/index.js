import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import {dummyJerseys} from '../../../data';
import {CardJersey} from '../..';
const ListJersey = (props) => {
  const [jerseys, setJerseys] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);
  useEffect(() => {
    setJerseys(dummyJerseys);
  }, []);
  return (
    <View style={styles.container}>
      {jerseys.map(jersey => (
        <CardJersey key={jersey.id} jersey={jersey} onPress={() => props.navigation.navigate("JerseyDetail", {jersey})}/>
      ))}
      {/* <FlatList
        contentContainerStyle={styles.container2}
        data={jerseys}
        // numColumns={2}
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
    </View>
  );
};

export default ListJersey;

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
  },
});
