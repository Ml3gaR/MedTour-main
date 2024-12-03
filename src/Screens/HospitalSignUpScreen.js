import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  hospitalName: Yup.string().required("Hospital name is required"),
  registrationNumber: Yup.string().required("Registration number is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]+$/, "Phone number must be digits").required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  address: Yup.string().required("Address is required"),
  price: Yup.string().required("Price is required"),
  distance: Yup.string().required("Distance from airport is required"),
  rating: Yup.string().required("Rating is required"),
  description: Yup.string().required("Description is required"),
});

function HospitalSignUpScreen() {
  const navigation = useNavigation();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedClinicType, setSelectedClinicType] = useState("");
  const [hospitalImage, setHospitalImage] = useState(null);

  // Fetch countries and cities from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries");
        const countryList = response.data.data.map((country) => ({
          label: country.country,
          value: country.country,
          cities: country.cities,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    const selected = countries.find((c) => c.value === countryName);
    setCities(selected?.cities.map((city) => ({ label: city, value: city })) || []);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setHospitalImage(result.assets[0].uri);
    }
  };

  const handleSignUp = async (values) => {
    try {
      const {
        email,
        password,
        hospitalName,
        registrationNumber,
        phone,
        address,
        price,
        distance,
        rating,
        description,
      } = values;

      if (!hospitalImage) {
        Alert.alert("Error", "Please upload a hospital image.");
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional hospital data in Firestore
      await setDoc(doc(db, "facilities", user.uid), {
        hospitalName,
        registrationNumber,
        email,
        phone,
        clinicType: selectedClinicType,
        country: selectedCountry,
        city: selectedCity,
        address,
        userType: "facility",
        price,
        distance,
        rating,
        description,
        image: hospitalImage,
      });

      Alert.alert("Sign Up Successful", "Your account has been created!", [
        { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
      ]);
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      Alert.alert("Error", "There was an issue creating your account.");
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppText style={styles.title}>Hospital Sign Up</AppText>
        <AppForm
          initialValues={{
            hospitalName: "",
            registrationNumber: "",
            email: "",
            phone: "",
            password: "",
            address: "",
            price: "",
            distance: "",
            rating: "",
            description: "",
          }}
          onSubmit={handleSignUp}
          validationSchema={validationSchema}
        >
          {/* Medical Facility Details */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Medical Facility Details</AppText>
            <AppFormField name="hospitalName" placeholder="Hospital Name" style={styles.input} />
            <AppFormField name="registrationNumber" placeholder="Registration Number" style={styles.input} />
            <AppFormField name="email" placeholder="Email" keyboardType="email-address" style={styles.input} />
            <AppFormField name="phone" placeholder="Phone Number" keyboardType="numeric" style={styles.input} />
            <AppFormField name="password" placeholder="Password" secureTextEntry style={styles.input} />
          </View>

          {/* Clinic Type */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Clinic Type</AppText>
            <RNPickerSelect
              onValueChange={(value) => setSelectedClinicType(value)}
              items={[
                { label: "Cardiology", value: "Cardiology" },
                { label: "Pediatrics", value: "Pediatrics" },
                { label: "Orthopedics", value: "Orthopedics" },
              ]}
              placeholder={{ label: "Select Clinic Type", value: null }}
              style={pickerSelectStyles}
            />
          </View>

          {/* Location Details */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Location</AppText>
            <RNPickerSelect
              onValueChange={(value) => handleCountryChange(value)}
              items={countries}
              placeholder={{ label: "Select Country", value: null }}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              onValueChange={(value) => setSelectedCity(value)}
              items={cities}
              placeholder={{ label: "Select City", value: null }}
              style={pickerSelectStyles}
              disabled={!cities.length}
            />
            <AppFormField name="address" placeholder="Address" multiline style={styles.input} />
          </View>

          {/* Hospital Profile Details */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Hospital Profile Details</AppText>
            <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
              <Text style={styles.imagePickerText}>
                {hospitalImage ? "Change Hospital Image" : "Upload Hospital Image"}
              </Text>
            </TouchableOpacity>
            <AppFormField name="price" placeholder="Price (SAR)" keyboardType="numeric" style={styles.input} />
            <AppFormField
              name="distance"
              placeholder="Distance from Airport (in meters)"
              keyboardType="numeric"
              style={styles.input}
            />
            <AppFormField name="rating" placeholder="Rating (1-5)" keyboardType="numeric" style={styles.input} />
            <AppFormField name="description" placeholder="Description" multiline style={styles.input} />
          </View>

          {/* Submit Button */}
          <SubmitButton title="Sign Up" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  imagePicker: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    color: "#333",
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    color: "#333",
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
};

export default HospitalSignUpScreen;
