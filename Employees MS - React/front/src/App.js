import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import './App.css';

import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";

import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./components/Dashboard";
import EmployeesPage from "./components/employees/EmployeesPage";
import EmployeesView from "./components/employees/EmployeesView";
import CreateEmployee from "./components/employees/CreateEmployee";
import ReadEmployee from "./components/employees/ReadEmployee";
import UpdateEmployee from "./components/employees/UpdateEmployee";
import DeleteEmployee from "./components/employees/DeleteEmployee";

import ProjectsPage from "./components/projects/ProjectsPage";
import ProjectsView from "./components/projects/ProjectsView";
import CreateProject from "./components/projects/CreateProject";
import ReadProject from "./components/projects/ReadProject";
import UpdateProject from "./components/projects/UpdateProject";
import DeleteProject from "./components/projects/DeleteProject";

const client=new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/homepage"/>
          </Route>
          <PublicRoute restricted={false} exact path="/homepage" component={Homepage}/>
          <PublicRoute restricted={true} exact path="/login" component={Login}/>
          <PublicRoute restricted={true} exact path="/register" component={Register}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/employees" component={EmployeesPage}/>
          <PrivateRoute exact path="/employees/display" component={EmployeesView}/>
          <PrivateRoute exact path="/employees/create" component={CreateEmployee}/>
          <PrivateRoute exact path="/employees/read" component={ReadEmployee}/>
          <PrivateRoute exact path="/employees/update" component={UpdateEmployee}/>
          <PrivateRoute exact path="/employees/delete" component={DeleteEmployee}/>
          <PrivateRoute exact path="/projects" component={ProjectsPage}/>
          <PrivateRoute exact path="/projects/display" component={ProjectsView}/>
          <PrivateRoute exact path="/projects/create" component={CreateProject}/>
          <PrivateRoute exact path="/projects/read" component={ReadProject}/>
          <PrivateRoute exact path="/projects/update" component={UpdateProject}/>
          <PrivateRoute exact path="/projects/delete" component={DeleteProject}/>
          <PublicRoute restricted={false} component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
