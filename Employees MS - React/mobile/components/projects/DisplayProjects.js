import React from 'react';
import { StyleSheet, View, Image, RefreshControl, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useQuery,gql } from "@apollo/client";

const SHOW_PROJECTS=gql`
    query {
      projects {
        _id
        project_name
        start_date
        planned_end_date
        description
        project_code
      }
    }
`;

export default function DisplayEmployees() {
  function EmployeesTableContent(){
      const { loading, error, data } = useQuery(SHOW_PROJECTS);
      if (loading)
        return <DataTable.Row><DataTable.Cell>Loading...</DataTable.Cell></DataTable.Row>;
      if (error)
      return <DataTable.Row><DataTable.Cell>Error :(</DataTable.Cell></DataTable.Row>;
    
      return data.projects.map((project) => (
        <DataTable.Row key={project._id}>
          <DataTable.Cell>{project._id}</DataTable.Cell>
          <DataTable.Cell>{project.project_name}</DataTable.Cell>
          <DataTable.Cell>{project.start_date}</DataTable.Cell>
          <DataTable.Cell>{project.planned_end_date}</DataTable.Cell>
          <DataTable.Cell>{project.description}</DataTable.Cell>
          <DataTable.Cell>{project.project_code}</DataTable.Cell>
        </DataTable.Row>
      ));
    }
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
        <ScrollView style={{overflow: "scroll",width: "100%"}}>
            <DataTable>
              <DataTable.Header>
                  <DataTable.Title scope="col">ID</DataTable.Title>
                  <DataTable.Title scope="col">Project Name</DataTable.Title>
                  <DataTable.Title scope="col">Start Date</DataTable.Title>
                  <DataTable.Title scope="col">Planned End Date</DataTable.Title>
                  <DataTable.Title scope="col">Description</DataTable.Title>
                  <DataTable.Title scope="col">Project Code</DataTable.Title>
              </DataTable.Header>
              <EmployeesTableContent/>
            </DataTable>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "50px",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderRadius: "100%",
    backgroundColor: "rgb(209, 209, 209)",
    border: "1px solid gray",
    marginBottom: "25px",
    width: "100px",
    height: "100px",
  },
});