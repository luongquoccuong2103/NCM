import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RouteMovingBetweenScreen from "../components/navigation/RouteMovingBetweenScreen";
// import RouteAuthentication from "../components/navigation/RouteAuthentication";
import AuthContext from "../store/AuthContext";

const Route = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RouteMovingBetweenScreen />
    </NavigationContainer>
  );
};
export default Route;
