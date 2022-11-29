import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, fonts} from '@utils';
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
    secureTextEntry,
    onChangeText,
  } = props;
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(fontSize)}>{label}</Text>
        <TextInput
          keyboardType={keyboardType}
          value={value}
          onChange={onChange}
          onChangeText={onChangeText}
          numberOfLines={3}
          placeholder={placeholder ? placeholder : label}
          style={styles.inputTextarea(fontSize)}
          placeholderTextColor={colors.border}
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
        onChangeText={onChangeText}
        placeholder={placeholder ? placeholder : label}
        style={styles.input(width, height, fontSize)}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.border}
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
    color: 'black',
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
    color: 'black',
  }),
});
