import {
  Text,
  View,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, FlashMode } from "expo-camera";
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
import { BarCodeScanner } from "expo-barcode-scanner";
import { t } from "i18next";
import vCard from "vcf";
import axios from "axios";
const ScanScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  let cameraRef = useRef(undefined);
  const [hasCameraPermission, setHasCameraPermission] = useState(undefined);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [stopScan, setStopScan] = useState(false);
  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
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
  } else if (!hasCameraPermission) {
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
            <Button>{t("Screen_Scan_Alert_Button_Ok")}</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }

  const takePic = async () => {
    let options = {
      quality: 1,
    };

    let newPhoto = await cameraRef.current?.takePictureAsync(options);

    if (newPhoto) {
      const formData = new FormData();

      formData.append("image", {
        uri: newPhoto.uri,
        type: "image/jpeg", // Thiết lập loại file
        name: newPhoto.uri.split("/").pop(), // Tên file từ URI
      });
      axios
        .post("http://192.168.1.5:5000/ocr_image", formData, {})
        .then((response) => {
          console.log("OCR Results:", response.data);
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
            img_url: newPhoto.uri || "",
          };
          navigation.navigate("AddContact", { newPhoto: data });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          Alert.alert("Upload Error", "Failed to upload image for OCR.");
        });
      // console.log(newPhoto);
      // navigation.navigate("", { newPhoto: newPhoto });
    } else {
      // Handle the case where takePictureAsync failed
      console.error("Failed to take a picture.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });
    // if (!result.canceled) {
    //   navigation.navigate("", { pickPhoto: result });
    // }
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
          <Camera
            style={[styles.preview_camera, { height: height }]}
            ref={cameraRef}
            ratio="4:3"
            flashMode={flashMode}
          >
            <View style={styles.preview_overlay}>
              <Image
                style={styles.preview_iconOverlay}
                source={iconPath.icOverlay}
              />
            </View>
          </Camera>
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
