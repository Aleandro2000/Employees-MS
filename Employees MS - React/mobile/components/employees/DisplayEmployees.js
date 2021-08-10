import React from 'react';
import { StyleSheet, View, Image, Button, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useQuery,gql } from "@apollo/client";

const SHOW_EMPLOYEES=gql`
    query {
        employees {
            _id
            name
            adress
            email
            job_title
            hire_date
            salary
            project {
              project_name
              start_date
              planned_end_date
              description
              project_code
            }
        }
    }
`;

export default function DisplayEmployees() {
  function EmployeesTableContent(){
    const { loading, error, data } = useQuery(SHOW_EMPLOYEES);
    if (loading)
      return <DataTable.Row><DataTable.Cell>Loading...</DataTable.Cell></DataTable.Row>;
    if (error)
      return <DataTable.Row><DataTable.Cell>Error :(</DataTable.Cell></DataTable.Row>;
  
    return data.employees.map((employee) => (
      <DataTable.Row key={employee._id}>
        <DataTable.Cell>{employee._id}</DataTable.Cell>
        <DataTable.Cell>{employee.name}</DataTable.Cell>
        <DataTable.Cell>{employee.email}</DataTable.Cell>
        <DataTable.Cell>{employee.adress}</DataTable.Cell>
        <DataTable.Cell>{employee.hire_date}</DataTable.Cell>
        <DataTable.Cell>{employee.job_title}</DataTable.Cell>
        <DataTable.Cell>{employee.salary}</DataTable.Cell>
        {
          (employee.project) ? (
            <>
              <DataTable.Cell>{employee.project.project_name}</DataTable.Cell>
              <DataTable.Cell>{employee.project.start_date}</DataTable.Cell>
              <DataTable.Cell>{employee.project.planned_end_date}</DataTable.Cell>
              <DataTable.Cell>{employee.project.description}</DataTable.Cell>
              <DataTable.Cell>{employee.project.project_code}</DataTable.Cell>
            </>
          ) : 
          (
            <>
              <DataTable.Cell/>
              <DataTable.Cell/>
              <DataTable.Cell/>
              <DataTable.Cell/>
              <DataTable.Cell/>
            </>
          )
        }
      </DataTable.Row>
    ));
  }
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <ScrollView style={{overflow: "scroll",width: "100%"}}>
          <DataTable>
            <DataTable.Header>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title>Adress</DataTable.Title>
                <DataTable.Title>Hire Date</DataTable.Title>
                <DataTable.Title>Job Title</DataTable.Title>
                <DataTable.Title>Salary</DataTable.Title>
                <DataTable.Title>Project Name</DataTable.Title>
                <DataTable.Title>Start Date</DataTable.Title>
                <DataTable.Title>Planned End Date</DataTable.Title>
                <DataTable.Title>Description</DataTable.Title>
                <DataTable.Title>Project Code</DataTable.Title>
            </DataTable.Header>
            <EmployeesTableContent/>
          </DataTable>
      </ScrollView>
      <Button title="Refresh" onPress={()=>window.location.reload(false)}/>
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