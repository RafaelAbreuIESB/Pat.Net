import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ placeholder, secureTextEntry, value, setValue }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={setValue}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
