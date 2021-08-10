import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';

export default function ProjectsMenu({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../resources/employee.png")}/>
      <View style={{marginBottom: "25px"}}>
        <Button title="DISPLAY PROJECTS" onPress={() => navigation.navigate('Display Projects')}/>
      </View>
      <View style={{marginBottom: "25px"}}>
        <Button title="CREATE PROJECT" onPress={() => navigation.navigate('Create Project')}/>
      </View>
      <View style={{marginBottom: "25px"}}>
        <Button title="READ PROJECT" onPress={() => navigation.navigate('Read Project')}/>
      </View>
      <View style={{marginBottom: "25px"}}>
        <Button title="UPDATE PROJECT" onPress={() => navigation.navigate('Update Project')}/>
      </View>
      <Button title="DELETE PROJECT" onPress={() => navigation.navigate('Delete Project')}/>
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