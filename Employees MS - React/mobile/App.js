import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";

import MainMenu from "./components/MainMenu";
import EmployeesMenu from "./components/employees/EmployeesMenu";
import ProjectsMenu from "./components/projects/ProjectsMenu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main Menu">
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Employees Menu" component={EmployeesMenu} />
        <Stack.Screen name="Projects Menu" component={ProjectsMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}