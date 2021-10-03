import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {dummyJerseys} from '../../../data';
import {CardJersey} from '../..';
const ListJersey = () => {
  const [jerseys, setJerseys] = useState([]);
  useEffect(() => {
    setJerseys(dummyJerseys);
  }, []);
  return (
    <View style={styles.container}>
      {jerseys.map(jersey => (
        <CardJersey key={jersey.id} jersey={jersey} />
      ))}
    </View>
  );
};

export default ListJersey;

const styles = StyleSheet.create({
  container: {
    matginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
