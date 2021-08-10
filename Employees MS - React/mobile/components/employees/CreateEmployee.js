import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, TextInput, Text, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";

const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($project_id: ID,$name: String!,$adress: String!,$email: String!,$job_title: String!,$hire_date: Date!,$salary: Int!) {
        createEmployee(
            name: $name
            adress: $adress
            email: $email
            job_title: $job_title
            hire_date: $hire_date
            salary: $salary
            project_id: $project_id
        ){
            _id
            project_id
            name
            adress
            email
            job_title
            hire_date
            salary
        }
    }
`;

const SHOW_PROJECTS=gql`
    query {
      projects {
        _id
        project_name
      }
    }
`;

export default function CreateEmployee() {
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const { data } = useQuery(SHOW_PROJECTS);
  const [message,setMessage]=useState("");

  let project_id,name,email,adress,job_title,hire_date,salary;
  
  const handleSubmit=async () => {
      await createEmployee({variables: {
          name: name.trim(),
          email: email.trim(),
          adress: adress,
          job_title: job_title.trim(),
          hire_date: hire_date,
          salary: Math.abs(salary),
          project_id: project_id
      }})
          .then(response => setMessage("Succeeded!"))
          .catch(err => setMessage(err.message));
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <Text style={{marginBottom: "10px"}}>Project:</Text>
      <View style={{marginBottom: "25px"}}>
        {
          (data) ? (
          <RNPickerSelect
            onValueChange={value => project_id=value}
            items={
              data.projects.map(project => {
              return({
                label: project.project_name, value: project.project_id
              });
            })
          }
          />) : (<></>)
        }
      </View>
      <TextInput onChangeText={text => name=text} style={styles.input} placeholder="Name"/>
      <TextInput onChangeText={text => email=text} style={styles.input} placeholder="Email"/>
      <TextInput onChangeText={text => adress=text} style={styles.input} placeholder="Adress"/>
      <TextInput onChangeText={text => job_title=text} style={styles.input} placeholder="Job Title"/>
      <TextInput onChangeText={text => hire_date=text} style={styles.input} placeholder="Hire Date"/>
      <TextInput onChangeText={text => salary=text} style={styles.input} placeholder="Salary"/>
      <Button title="SUBMIT" onPress={handleSubmit}/>
      <StatusBar style="auto" />
      <Text style={{marginTop: "25px"}}>{message}</Text>
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
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
  },
});