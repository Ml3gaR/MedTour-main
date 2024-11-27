import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Alert } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Ensure Firebase is properly configured

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;

      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Fetch account type from Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      const facilityDoc = await getDoc(doc(db, "facilities", uid));

      if (userDoc.exists()) {
        // Navigate to user-specific screen
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
      } else if (facilityDoc.exists()) {
        // Navigate to medical facility-specific screen
        navigation.reset({ index: 0, routes: [{ name: "HospitalHomeScreen" }] });
      } else {
        throw new Error("No user data found");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/MedTourLogo.png")}
      />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />

        <SubmitButton title="Login" />
      </AppForm>

      {/* Create New Account */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUpSelectionScreen")}>
        <AppText style={styles.createAccountText}>Create New Account</AppText>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 190,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  createAccountText: {
    color: colors.secondary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default LoginScreen;
