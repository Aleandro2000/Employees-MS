import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";

const READ_PROJECT = gql`
    mutation ReadProject($_id: ID!) {
        readProject(
            _id: $_id
        ){
            _id
            project_name
            start_date
            planned_end_date
            description
            project_code
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

export default function ReadProject() {
  const [mutation] = useMutation(READ_PROJECT);
  const { data } = useQuery(SHOW_PROJECTS);
  const [message,setMessage]=useState("");

  let _id;
  
  const handleSubmit=async () => {
    if(_id)
      await mutation({variables: {
          _id: _id
      }})
          .then(response => setMessage(JSON.stringify(response.data.readProject)))
          .catch(err => setMessage(err.message));
    else
      setMessage("Please fill all input boxes or check them if they are correct!");
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <Text style={{marginBottom: "10px"}}>Project:</Text>
      <View style={{marginBottom: "25px"}}>
        {
          (data) ? (
          <RNPickerSelect
            placeholder=""
            onValueChange={value => _id=value}
            items={
              data.projects.map(project => {
              return({
                label: project.project_name, value: project._id
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