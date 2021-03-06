import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';

export default function EmployeesMenu({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <View style={{marginBottom: "25px"}}>
        <Button title="DISPLAY EMPLOYEES" onPress={() => navigation.navigate('Display Employees')}/>
      </View>
      <View style={{marginBottom: "25px"}}>
        <Button title="CREATE EMPLOYEE" onPress={() => navigation.navigate('Create Employee')}/>
      </View>
      <View style={{marginBottom: "25px"}}>
        <Button title="READ EMPLOYEE" onPress={() => navigation.navigate('Read Employee')}/>
      </View>
      <View style={{marginBottom: "25px"}}>
        <Button title="UPDATE EMPLOYEE" onPress={() => navigation.navigate('Update Employee')}/>
      </View>
      <Button title="DELETE EMPLOYEE" onPress={() => navigation.navigate('Delete Employee')}/>
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
});