import { useContext } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { GroupContact, Team, Setting, Home } from "../../screien";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../navigation/styles";
import { useTranslation } from "react-i18next";
import Home from "../../screens/home/Home";
import RouteMovingBetweenScanScreen from "./RouteMovingBetweenScanScren";
const Tab = createBottomTabNavigator();

const Mock = () => {
  return (
    <View>
      <Text>work in progress</Text>
    </View>
  );
};

const RouteNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={"HomeScreen"}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          height: 80,
          ...styles(false).shadow,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Icon
                  name="home"
                  size={26}
                  color={focused ? "#1890FF" : "#828282"}
                />
                <Text style={styles(focused).label}>Home</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="ScanScreen"
        component={RouteMovingBetweenScanScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[styles(focused).containerScan, styles(focused).shadow]}
              >
                <Icon name="credit-card-scan" size={30} color="#fff" />
              </View>
            );
          },
          tabBarStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Mock}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Icon
                  name="cog"
                  size={26}
                  color={focused ? "#1890FF" : "#828282"}
                />
                <Text style={styles(focused).label}>Setting</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default RouteNavigation;
