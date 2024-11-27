import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

export default function SignUpSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>Choose your account type</Text>

      <TouchableOpacity
        style={[styles.button, styles.userButton]}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.buttonText}>Sign-Up as a User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.facilityButton]}
        onPress={() => navigation.navigate("HospitalSignUpScreen")}
      >
        <Text style={styles.buttonText}>Sign-Up as a Medical Facility</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f9f9",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    header: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 10,
      textAlign: "center",
    },
    subHeader: {
      fontSize: 18,
      color: "#666",
      marginBottom: 30,
      textAlign: "center",
    },
    button: {
      width: "80%",
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      marginVertical: 10,
    },
    userButton: {
      backgroundColor: colors.primary, // Blue background
    },
    facilityButton: {
      backgroundColor: "transparent", // Transparent background
      borderWidth: 1,
      borderColor: colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    userButtonText: {
      color: "#FFFFFF", // White text for the blue button
    },
    facilityButtonText: {
      color: colors.primary, // Blue text for the transparent button
    },
  });