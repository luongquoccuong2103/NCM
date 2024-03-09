import React from "react";
import { StyleSheet } from "react-native";

const styles = (focused) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      tintColor: focused ? "#1890FF" : "#828282",
    },
    label: {
      fontSize: 12,
      color: focused ? "#1890FF" : "#828282",
      textAlign: "center",
      display: focused ? "flex" : "none",
    },
    containerScan: {
      position: "absolute",
      top: -20,
      width: 70,
      height: 70,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1890FF",
      borderRadius: 35,
    },
    // labelScan: {
    //     fontSize: 12,
    //     color: '#ffff',
    //     textAlign: 'center',
    //     textTransform: 'uppercase',
    // },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });

export default styles;
