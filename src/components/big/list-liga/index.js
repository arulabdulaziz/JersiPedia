import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {CardLiga} from '../../small';
import {dummyLigas} from '../../../data/dummyLigas';
const ListLiga = props => {
  const [ligas, setLigas] = useState([]);
  useEffect(() => {
    setLigas(dummyLigas);
  }, []);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {ligas.map(liga => (
          <CardLiga key={liga.id} liga={liga} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ListLiga;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});
