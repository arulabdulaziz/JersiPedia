import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors, responsiveHeight} from '../../../utils';
import {Picker as PickerInput} from '@react-native-picker/picker';

const Picker = props => {
  const {fontSize, textArea, width, height, label, onChange, options, value} =
    props;
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label}</Text>
      <View style={styles.wrapperPicker}>
        <PickerInput
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker(width, height, fontSize)}>
          {options.map((e, i) => (
            <PickerInput.Item label={e} value={e} key={i} />
          ))}
        </PickerInput>
      </View>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: fontSize => ({
    fontFamily: fonts.primary.regular,
    fontSize: fontSize ? fontSize : 18,
  }),
  picker: (width, height, fontSize) => ({
    width,
    height: height ? height : responsiveHeight(46),
    marginTop: -10,
    marginBottom: 10,
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
  }),
  wrapperPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
  },
});
