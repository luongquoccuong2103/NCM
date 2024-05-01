import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  LogBox,
  Appearance,
  Platform,
  Button,
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import Route from "./src/navigation/Router";
import AddContact from "./src/screens/addContact/AddContact";
import LoadingDialog from "./src/components/customDialog/dialog/loadingDialog/LoadingDialog";
const App = () => {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ]);
  const [data, setData] = useState([{}]);
  useEffect(() => {
    Appearance.getColorScheme() === "dark"
      ? StatusBar.setBarStyle("light-content")
      : StatusBar.setBarStyle("dark-content");
    Platform.OS === "android" &&
      StatusBar.setBackgroundColor(
        Appearance.getColorScheme() === "dark" ? "#000" : "#fff"
      );
    fetch("http://192.168.1.5:5000/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Route />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
