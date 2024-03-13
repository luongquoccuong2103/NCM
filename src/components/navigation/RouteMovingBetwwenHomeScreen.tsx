import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewContact from "../../screens/viewContact/ViewContact";
import UpdateContact from "../../screens/updateContact/UpdateContact";
const Stack = createNativeStackNavigator();

const RouteMovingBetweenHomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ViewContact" component={ViewContact} />
      <Stack.Screen name="UpdateContact" component={UpdateContact} />
      {/* <Stack.Screen name="SearchContact" component={SearchContact} /> */}
      {/* <Stack.Screen name="AddContactToManyGroup" component={AddContactToManyGroup} /> */}
    </Stack.Navigator>
  );
};

export default RouteMovingBetweenHomeScreen;
