import {
  Text,
  View,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { FlashMode } from "expo-camera/build/legacy/Camera.types";
import * as ImagePicker from "expo-image-picker";
import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
  Paragraph,
  Title,
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import iconPath from "../../constants/iconPath";
import styles from "./styles";
import axios from "axios";
import { t } from "i18next";

const ScanScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  let cameraRef = useRef(null);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);
  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card elevation={2} style={{ width: "80%", padding: 20 }}>
          <ActivityIndicator size="large" color="#1980FF" />
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            {t("Screen_Scan_Alert_Permission")}
          </Text>
        </Card>
      </View>
    );
  } else if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card elevation={2} style={{ width: "80%", padding: 20 }}>
          <Card.Content>
            <Title>{t("Screen_Scan_Alert_Erorr")}</Title>
            <Paragraph>{t("Screen_Scan_Alert_Erorr_Message_Camera")}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.goBack()}>
              {t("Screen_Scan_Alert_Button_Cancel")}
            </Button>
            <Button onPress={requestPermission}>
              {t("Screen_Scan_Alert_Button_Ok")}
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }

  const handleImageUpload = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      type: "image/jpeg",
      name: uri.split("/").pop(),
    });

    try {
      const response = await axios.post(
        "http://192.168.1.180:5000/ocr_image",
        formData,
        {}
      );
      const data = {
        name: response?.data?.name || "",
        job_title: response?.data?.jobTittle || "",
        company: response?.data?.comapny || "",
        phone: response?.data?.phoneNumber || "",
        email: response?.data?.email || "",
        fax: response?.data?.fax || "",
        address: response?.data?.address || "",
        note: "",
        website: response?.data?.website || "",
        img_url: uri || "",
      };
      navigation.navigate("AddContact", { newPhoto: data });
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", "Failed to upload image for OCR.");
    }
  };

  const takePic = async () => {
    let options = {
      quality: 1,
    };

    let newPhoto = await cameraRef.current?.takePictureAsync(options);

    if (newPhoto) {
      handleImageUpload(newPhoto.uri);
    } else {
      console.error("Failed to take a picture.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      handleImageUpload(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="close-circle"
          size={26}
          iconColor="#fff"
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon={flashMode === FlashMode.on ? "flash" : "flash-off"}
          size={26}
          iconColor="#fff"
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.on : FlashMode.off
            )
          }
        />
      </View>
      <View style={[styles.preview, { height: height }]}>
        {isFocused && (
          <CameraView
            style={[styles.preview_camera, { height: height }]}
            ref={cameraRef}
            ratio="4:3"
            flashMode={"auto"}
            mode={"picture"}
            autofocus={"on"}
          >
            <View style={styles.preview_overlay}>
              <Image
                style={styles.preview_iconOverlay}
                source={iconPath.icOverlay}
              />
            </View>
          </CameraView>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footer_content}>
          <IconButton
            icon="image"
            size={40}
            iconColor="#FFF"
            onPress={pickImage}
            disabled={false}
          />
          <IconButton
            size={80}
            icon="checkbox-blank-circle"
            iconColor="#FFF"
            onPress={takePic}
            disabled={false}
            style={styles.take_picture}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;
