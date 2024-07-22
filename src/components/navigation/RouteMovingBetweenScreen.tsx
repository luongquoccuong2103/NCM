import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RouteNavigation from "./RouteBottom";
import { View, Text } from "react-native";
import RouteMovingBetweenHomeScreen from "./RouteMovingBetwwenHomeScreen";

const Stack = createNativeStackNavigator();

const Mock = () => {
  return (
    <View>
      <Text>work in progress</Text>
    </View>
  );
};
const RouteMovingBetweenScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Bottom"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Bottom" component={RouteNavigation} />
      <Stack.Screen name="SettingSwap" component={Mock} />
      <Stack.Screen name="HomeSwap" component={RouteMovingBetweenHomeScreen} />
      <Stack.Screen name="TeamSwap" component={Mock} />
      <Stack.Screen name="GroupSwap" component={Mock} />
    </Stack.Navigator>
  );
};

export default RouteMovingBetweenScreen;
