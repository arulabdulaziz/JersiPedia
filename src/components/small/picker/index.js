import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors, responsiveHeight} from '@utils';
import {Picker as PickerInput} from '@react-native-picker/picker';
// GANTI VALUE PROVINCE DAN CITIES DENGAN ID NYA LANGSUNG, TIDAK DENGAN OBJ NY!!!
const Picker = props => {
  const {fontSize, textArea, width, height, label, onChange, options, value, type} =
    props;
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label}</Text>
      <View style={styles.wrapperPicker}>
        <PickerInput
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker(width, height, fontSize)}>
          <PickerInput.Item label={'--Pilih--'} value={''} disabled={true} />
          {options.map((e, i) => {
            if (type == 'province') {
              return (
                <PickerInput.Item
                  label={e.province}
                  value={e.province_id}
                  key={e.province_id}
                />
              );
            } else if (type == 'city') {
              return (
                <PickerInput.Item
                  label={`${e.type} ${e.city_name}`}
                  value={e.city_id}
                  key={e.city_id}
                />
              );
            } else if (type == 'courier') {
              return (
                <PickerInput.Item
                  label={e.label}
                  value={e}
                  key={e.id}
                />
              );
            }
            return <PickerInput.Item label={e} value={e} key={i} />;
          })}
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
