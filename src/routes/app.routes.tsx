import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../Screens/Dashboard";
import { Register } from "../Screens/Register";

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
      <Screen name="Resumo" component={Register} />
    </Navigator>
  );
}
