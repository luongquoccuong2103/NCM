import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScan from "../skeleton/addContact/LoadingScan";
import ScanScreen from "../../screens/scan/ScanScreen";
const ScanStack = createNativeStackNavigator();

const RouteMovingBetweenScanScreen = () => {
  return (
    <ScanStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ScanStack.Screen name="Scan" component={ScanScreen} />
      <ScanStack.Screen name="AddContact" component={LoadingScan} />
    </ScanStack.Navigator>
  );
};

export default RouteMovingBetweenScanScreen;
