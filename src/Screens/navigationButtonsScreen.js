import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const navigationButtonsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Go to Medical Procedure Screen" onPress={() => navigation.navigate('MedicalProcedureScreen')} />
      <Button title="Go to Test1 Screen" onPress={() => navigation.navigate('Test1Screen')} />
      <Button title="Go to My Account" onPress={() => navigation.navigate('MyAccount')} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Go to Permission Requests" onPress={() => navigation.navigate('PermissionRequests')} />
      <Button title="Go to Hotel Details" onPress={() => navigation.navigate('HotelDetails')} />
      <Button title="Go to Hospital List Screen" onPress={() => navigation.navigate('HospitalListScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});

export default navigationButtonsScreen;
