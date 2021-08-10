import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";

const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($_id: ID!) {
        deleteEmployee(
            _id: $_id
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

export default function DeleteEmployee() {
  const [mutation] = useMutation(DELETE_EMPLOYEE);
  const { data } = useQuery(SHOW_EMPLOYEES);
  const [message,setMessage]=useState("");

  let _id;
  
  const handleSubmit=async () => {
    if(_id)
    {
      await mutation({variables: {
          _id: _id
      }})
        .then(response => setMessage("Successfully deleted!"))
        .catch(err => setMessage(err.message));
      window.location.reload(false);
    }
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