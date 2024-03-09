import React, { useState, useContext, useEffect } from "react";
import styles from "./styles";
import { View, Text } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  TextInput
} from "react-native-paper";
const LoadingDialog = (props) => {
  return (
    <Portal>
      <Dialog visible={props.onVisible} style={{ borderRadius: 10, height: '25%' }} >
        <Dialog.Title style={styles.title}>Loading...</Dialog.Title>
        <Dialog.Content>
          <View style={styles.loadingContainer}>
          <AnimatedLottieView style={styles.loading} source={require('../../../../asset/animation/loading.json')} loop autoPlay />
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

export default LoadingDialog