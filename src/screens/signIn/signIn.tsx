import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import CustomInputs from "../../components/CustomInputs/CustomInputs";
import { Provider, TextInput } from "react-native-paper";
import styles from "./styles";
import CustomHeaders from "../../components/CustomHeaders/CustomHeader";
// @ts-ignore
import Logo_Login from "../../asset/image/login.png";
import CustomButtons from "../../components/CustomButton/CustomButton";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const options = [
  { label: "VN", value: "vn" },
  { label: "EN", value: "en" },
];

const SignIn = () => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name) => {
    return (text) => {
      setUser({
        ...user,
        [name]: text,
      });
    };
  };

  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  };
  return (
    <Provider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.root}>
          <View>
            <CustomHeaders
              text_title=""
              text_PRIMARY="Name Card Management"
              Logo={Logo_Login}
            />
          </View>
          <View style={styles.input}>
            <CustomInputs
              value={user.email}
              setValue={handleChange("email")}
              icon={"close-circle"}
              label={"Email"}
              secureTextEntry={false}
              onpress={() => {}}
              type={"email-address"}
            />
            <CustomInputs
              value={user.password}
              setValue={handleChange("password")}
              label={"Password"}
              secureTextEntry={isSecureEntry}
              icon={isSecureEntry ? "eye" : "eye-off"}
              onpress={onVisibilityPasswordPressed}
              type={"email-address"}
            />
          </View>
          <View style={styles.button_login}>
            <CustomButtons text="Login" onPress={() => {}} />
          </View>
          <View style={styles.title}>
            <Text style={styles.title_label}>@2024 Developed by Cuong</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
};

export default SignIn;
