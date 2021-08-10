import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";

import MainMenu from "./components/MainMenu";
import EmployeesMenu from "./components/employees/EmployeesMenu";
import CreateEmployee from "./components/employees/CreateEmployee";
import ReadEmployee from "./components/employees/ReadEmployee";
import UpdateEmployee from "./components/employees/UpdateEmployee";
import DeleteEmployee from "./components/employees/DeleteEmployee";
import DisplayEmployees from "./components/employees/DisplayEmployees";
import ProjectsMenu from "./components/projects/ProjectsMenu";
import CreateProject from "./components/projects/CreateProject";
import ReadProject from "./components/projects/ReadProject";
import UpdateProject from "./components/projects/UpdateProject";
import DeleteProject from "./components/projects/DeleteProject";
import DisplayProjects from "./components/projects/DisplayProjects";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main Menu">
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Employees Menu" component={EmployeesMenu} />
        <Stack.Screen name="Create Employee" component={CreateEmployee} />
        <Stack.Screen name="Read Employee" component={ReadEmployee} />
        <Stack.Screen name="Update Employee" component={UpdateEmployee} />
        <Stack.Screen name="Delete Employee" component={DeleteEmployee} />
        <Stack.Screen name="Display Employees" component={DisplayEmployees} />
        <Stack.Screen name="Projects Menu" component={ProjectsMenu} />
        <Stack.Screen name="Create Project" component={CreateProject} />
        <Stack.Screen name="Read Project" component={ReadProject} />
        <Stack.Screen name="Update Project" component={UpdateProject} />
        <Stack.Screen name="Delete Project" component={DeleteProject} />
        <Stack.Screen name="Display Projects" component={DisplayProjects} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}