import { StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
const CustomInputs = ({
  value,
  setValue,
  secureTextEntry,
  label,
  icon,
  onpress,
  type,
}) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      theme={{
        roundness: 10,
        colors: { primary: "#1890FF", error: "#B22D1D" },
      }}
      right={
        <TextInput.Icon
          name={icon}
          onPress={onpress}
          size={20}
          forceTextInputFocus={false}
          color="#828282"
        />
      }
      keyboardType={type}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "85%",
    marginBottom: 5,
    backgroundColor: "white",
  },
  icon: {},
});

export default CustomInputs;
