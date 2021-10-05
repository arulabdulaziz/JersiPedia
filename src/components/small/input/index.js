import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';
const Input = props => {
  const {
    fontSize,
    textarea,
    width,
    height,
    placeholder,
    label,
    value,
    onChange,
    keyboardType,
  } = props;
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(fontSize)}>{label}</Text>
        <TextInput
          keyboardType={keyboardType}
          value={value}
          onChange={onChange}
          numberOfLines={3}
          style={styles.inputTextarea(fontSize)}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        value={value}
        onChange={onChange}
        style={styles.input(width, height, fontSize)}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: fontSize => ({
    fontFamily: fonts.primary.regular,
    fontSize: fontSize ? fontSize : 18,
  }),
  input: (width, height, fontSize) => ({
    width,
    height,
    fontSize: fontSize ? fontSize : 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: fonts.primary.regular,
  }),
  inputTextarea: fontSize => ({
    fontSize: fontSize ? fontSize : 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: fonts.primary.regular,
    textAlignVertical: 'top',
  }),
});
