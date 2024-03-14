import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  LogBox,
  Appearance,
  Platform,
} from "react-native";
import Route from "./src/navigation/Router";
import { AuthProvider } from "./src/store/AuthContext";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ]);

  useEffect(() => {
    Appearance.getColorScheme() === "dark"
      ? StatusBar.setBarStyle("light-content")
      : StatusBar.setBarStyle("dark-content");
    Platform.OS === "android" &&
      StatusBar.setBackgroundColor(
        Appearance.getColorScheme() === "dark" ? "#000" : "#fff"
      );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <AuthProvider> */}
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Route />
      </Provider>

      {/* </AuthProvider> */}
    </SafeAreaView>
  );
};

export default App;
