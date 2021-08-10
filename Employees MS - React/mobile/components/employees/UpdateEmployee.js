import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, TextInput, Text, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";
import { validateDate,validateEmail,validatePositiveNumber,convertDate } from "../../utils";

const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($project_id: ID,$_id: ID!,$name: String!,$adress: String!,$email: String!,$job_title: String!,$hire_date: Date!,$salary: Int!) {
        updateEmployee(
            _id: $_id,
            name: $name,
            adress: $adress,
            email: $email,
            job_title: $job_title,
            hire_date: $hire_date,
            salary: $salary
            project_id: $project_id
        ){
            _id
            name
            adress
            email
            job_title
            hire_date
            salary
        }
    }
`;

const SHOW_EMPLOYEES=gql`
    query {
        employees {
            _id
            name
        }
    }
`;

export default function UpdateEmployee() {
  const [createEmployee] = useMutation(UPDATE_EMPLOYEE);
  const { data } = useQuery(SHOW_EMPLOYEES);
  const [message,setMessage]=useState("");

  let project_id,_id,name,email,adress,job_title,hire_date,salary;
  
  const handleSubmit=async () => {
    if(_id&&name&&validateEmail(email)&&adress&&job_title&&validateDate(hire_date)&&validatePositiveNumber(salary))
      await createEmployee({variables: {
          name: name.trim(),
          email: email.trim(),
          adress: adress,
          job_title: job_title.trim(),
          hire_date: convertDate(hire_date),
          salary: Math.abs(salary),
          project_id: project_id,
          _id: _id
      }})
          .then(response => setMessage("Succeeded!"))
          .catch(err => setMessage(err.message));
    else
      setMessage("Please fill all input boxes or check them if they are correct!");
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <Text style={{marginBottom: "10px"}}>Employee:</Text>
      <View style={{marginBottom: "25px"}}>
        {
          (data) ? (
          <RNPickerSelect
            placeholder=""
            onValueChange={value => _id=value}
            items={
              data.employees.map(employee => {
              return({
                label: employee.name, value: employee._id
              });
            })
          }
          />) : (<></>)
        }
      </View>
      <TextInput onChangeText={text => project_id=text} style={styles.input} placeholder="Project ID"/>
      <TextInput onChangeText={text => name=text} style={styles.input} placeholder="Name"/>
      <TextInput onChangeText={text => email=text} style={styles.input} placeholder="Email"/>
      <TextInput onChangeText={text => adress=text} style={styles.input} placeholder="Adress"/>
      <TextInput onChangeText={text => job_title=text} style={styles.input} placeholder="Job Title"/>
      <TextInput onChangeText={text => hire_date=text} style={styles.input} placeholder="Hire Date"/>
      <Text>(mm/dd/yyyy)</Text>
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
    marginBottom: 5,
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
  },
});