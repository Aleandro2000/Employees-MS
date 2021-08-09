import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';

export default function MainMenu({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../resources/employee.png")}/>
      <View style={{marginBottom: "25px"}}>
        <Button title="EMPLOYEES MENU" onPress={() => navigation.navigate('Employees Menu')}/>
      </View>
      <Button title="PROJECTS MENU" onPress={() => navigation.navigate('Projects Menu')}/>
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