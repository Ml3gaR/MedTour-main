import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]+$/, "Phone number must be digits").required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  age: Yup.number().optional(),
  weight: Yup.number().optional(),
  height: Yup.number().optional(),
});

function SignUpScreen() {
  const navigation = useNavigation();

  const handleSignUp = (values) => {
    // Simulate a successful sign-up
    Alert.alert("Sign Up Successful", "Your account has been created!", [
      { text: "OK", onPress: () => navigation.navigate("Login") }, // Navigate to login or target screen
    ]);
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ name: "", email: "", phone: "", password: "", age: "", weight: "", height: "" }}
        onSubmit={handleSignUp}
        validationSchema={validationSchema}
      >
        <AppFormField name="name" placeholder="Name" autoCorrect={false} />
        <AppFormField
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AppFormField name="phone" placeholder="Phone Number" keyboardType="numeric" />
        <AppFormField name="password" placeholder="Password" secureTextEntry />

        {/* Optional fields */}
        <AppFormField name="age" placeholder="Age (Optional)" keyboardType="numeric" />
        <AppFormField name="weight" placeholder="Weight (Optional)" keyboardType="numeric" />
        <AppFormField name="height" placeholder="Height (Optional)" keyboardType="numeric" />

        <SubmitButton title="Sign Up" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default SignUpScreen;
