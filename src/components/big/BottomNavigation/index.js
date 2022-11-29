import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TabItem from '../tab-item';
import {colors} from "@utils"
const BottomNavigation = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
            key={index}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
};
export default BottomNavigation;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    marginHorizontal: 30,
    paddingHorizontal: 30,
    backgroundColor: colors.primary,
    paddingVertical: 8,
    marginBottom: 30,
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
