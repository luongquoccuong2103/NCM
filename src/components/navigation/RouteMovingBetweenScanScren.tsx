import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScanScreen from "../../screens/scan/ScanScreen";
import AddContact from "../../screens/addContact/AddContact";
const ScanStack = createNativeStackNavigator();

const RouteMovingBetweenScanScreen = () => {
  return (
    <ScanStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ScanStack.Screen name="Scan" component={ScanScreen} />
      <ScanStack.Screen name="AddContact" component={AddContact} />
    </ScanStack.Navigator>
  );
};

export default RouteMovingBetweenScanScreen;
