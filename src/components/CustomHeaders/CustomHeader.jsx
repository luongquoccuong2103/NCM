import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
const CustomHeaders = ({ text_PRIMARY, text_title, Logo }) => {
  const { height } = useWindowDimensions();
  return (
    <View style={styles.root}>
      <View style={styles.headline}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.text_PRIMARY}>{text_PRIMARY}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text_title}>{text_title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 300,
    maxWidth: 300,
    height: 80,
    marginBottom: 10,
    marginTop: "10%",
    alignItems: "center",
  },
  text_PRIMARY: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2F80ED",
    textAlign: "center",
  },
  text_title: {
    textAlign: "center",
    fontWeight: "900",
    marginTop: 10,
    color: "#333333",
  },
});

export default CustomHeaders;
