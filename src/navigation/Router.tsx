import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RouteMovingBetweenScreen from "../components/navigation/RouteMovingBetweenScreen";
// import RouteAuthentication from "../components/navigation/RouteAuthentication";

const Route = () => {
  return (
    <NavigationContainer>
      <RouteMovingBetweenScreen />
    </NavigationContainer>
  );
};
export default Route;
