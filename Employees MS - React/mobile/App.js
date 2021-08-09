import { NativeRouter, Route } from 'react-router-native';
import React from "react";

import MainMenu from "./components/MainMenu";
import EmployeesMenu from "./components/employees/EmployeesMenu";
import ProjectsMenu from "./components/projects/ProjectsMenu";

export default function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={MainMenu}/>
      <Route exact path="/employees" component={EmployeesMenu}/>
      <Route exact path="/projects" component={ProjectsMenu}/>
    </NativeRouter>
  );
}