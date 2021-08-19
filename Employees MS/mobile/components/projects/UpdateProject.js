import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, TextInput, Text } from 'react-native';
import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";
import { validateDate,convertDate } from "../../utils";
import RNPickerSelect from 'react-native-picker-select';

const UPDATE_PROJECT = gql`
    mutation UpdateProject($_id: ID!,$project_name: String!,$start_date: Date!,$planned_end_date: Date!,$description: String,$project_code: String!) {
        updateProject(
            _id: $_id
            project_name: $project_name
            start_date: $start_date
            planned_end_date: $planned_end_date
            description: $description
            project_code: $project_code
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

export default function UpdateProject() {
  const [mutation] = useMutation(UPDATE_PROJECT);
  const [message,setMessage]=useState("");
  const { data }=useQuery(SHOW_PROJECTS);

  let _id,project_name,start_date,planned_end_date,description,project_code;
  
  const handleSubmit=async () => {
    if(_id&&project_name&&validateDate(start_date)&&validateDate(planned_end_date)&&project_code)
    {
      await mutation({variables: {
        _id: _id,
        project_name: project_name.trim(),
        start_date: start_date,
        planned_end_date: planned_end_date,
        description: description,
        project_code: project_code
      }})
        .then(response => setMessage("Succeeded!"))
        .catch(err => setMessage(err.message));
      window.location.reload(false);
    }
    else
      setMessage("Please fill all input boxes or check them if they are correct!");
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <View style={{marginBottom: "25px"}}>
        {
          (data) ? (
          <RNPickerSelect
            placeholder=""
            onValueChange={value => project_id=value}
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
      <TextInput onChangeText={text => project_name=text} style={styles.input} placeholder="Project Name"/>
      <TextInput onChangeText={text => start_date=text} style={styles.input} placeholder="Start Date"/>
      <Text>(mm/dd/yyyy)</Text>
      <TextInput onChangeText={text => planned_end_date=text} style={styles.input} placeholder="Planned End Date"/>
      <Text>(mm/dd/yyyy)</Text>
      <TextInput onChangeText={text => description=text} style={styles.input} placeholder="Description"/>
      <TextInput onChangeText={text => project_code=text} style={styles.input} placeholder="Project Code"/>
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