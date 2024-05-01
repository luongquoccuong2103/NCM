import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./../../screens/addContact/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";

const TextInputItem = ({ item, handleChange, errors, touched, values }) => {
  const [value, setValue] = useState(values[item.name]);

  useEffect(() => {
    setValue(values[item.name]);
  }, [values[item.name]]);

  return (
    <View style={styles.formInput_item}>
      <View style={styles.formInput_item_component}>
        <Icon size={20} name={item.icon} color="#1890FF" />
        <View style={{ width: "90%", marginLeft: 10 }}>
          <Text style={{ fontWeight: "600", color: "#1890FF" }}>
            {item.title}
          </Text>
          <TextInput
            placeholder={item.placeholder}
            value={value}
            multiline={item.multiline}
            keyboardType={item.keyboardType}
            dense={true}
            style={styles.formInput_item_input}
            onChangeText={(text) => {
              setValue(text);
              handleChange(item.name)(text);
            }}
            error={errors[item.name] && touched[item.name]}
            theme={{
              colors: {
                primary: "#1890FF",
                error: "#B22D1D",
              },
            }}
          />
          {errors[item.name] && touched[item.name] ? (
            <View style={styles.formInput_item_error}>
              <Text style={styles.formInput_item_error_label}>
                {errors[item.name]}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default TextInputItem;
