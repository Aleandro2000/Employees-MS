import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button, TextInput, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function UpdateProject() {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <View style={{marginBottom: "10px"}}>
        <Text>Project:</Text>
      </View>
      <View style={{marginBottom: "25px"}}>
        <RNPickerSelect
          items={[
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
          ]}
        />
      </View>
      <TextInput style={styles.input} placeholder="Name"/>
      <TextInput style={styles.input} placeholder="Email"/>
      <TextInput style={styles.input} placeholder="Adress"/>
      <TextInput style={styles.input} placeholder="Job Title"/>
      <TextInput style={styles.input} placeholder="Hire Date"/>
      <TextInput style={styles.input} placeholder="Salary"/>
      <Button title="SUBMIT"/>
      <StatusBar style="auto" />
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