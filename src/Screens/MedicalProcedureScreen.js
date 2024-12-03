import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Update with your Firebase setup

export default function MedicalProcedureScreen({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch registered countries, cities, and categories from Firestore
  useEffect(() => {
    const fetchLocationsAndCategories = async () => {
      try {
        const facilitiesRef = collection(db, "facilities"); // Collection name
        const snapshot = await getDocs(facilitiesRef);

        const locationData = snapshot.docs.map((doc) => doc.data());

        // Extract unique countries, cities, and categories
        const uniqueCountries = {};
        const uniqueCategories = new Set();
        locationData.forEach(({ country, city, clinicType }) => {
          if (!uniqueCountries[country]) {
            uniqueCountries[country] = new Set();
          }
          uniqueCountries[country].add(city);
          uniqueCategories.add(clinicType);
        });

        // Format countries and cities for RNPickerSelect
        const formattedCountries = Object.keys(uniqueCountries).map((country) => ({
          label: country,
          value: country,
          cities: Array.from(uniqueCountries[country]), // Convert Set to Array
        }));

        setCountries(formattedCountries);
        setCategories(
          Array.from(uniqueCategories).map((category) => ({
            label: category,
            value: category,
          }))
        );
      } catch (error) {
        console.error("Error fetching locations and categories:", error);
        Alert.alert("Error", "Could not fetch location and category data.");
      }
    };

    fetchLocationsAndCategories();
  }, []);

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    const selected = countries.find((c) => c.value === countryName);
    setCities(
      selected?.cities.map((city) => ({ label: city, value: city })) || []
    );
  };

  const handleNext = () => {
    if (!selectedCountry || !selectedCity || !selectedCategory) {
      Alert.alert("Error", "Please select all fields!");
      return;
    }

    // Navigate to HospitalListScreen with the selected filters
    navigation.navigate("HospitalListScreen", {
      country: selectedCountry,
      city: selectedCity,
      category: selectedCategory,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Medical Facilities</Text>
      <View style={styles.formContainer}>
        {/* Country Picker */}
        <RNPickerSelect
          onValueChange={handleCountryChange}
          items={countries}
          placeholder={{ label: "Select Country", value: null }}
          style={pickerSelectStyles}
        />

        {/* City Picker */}
        <RNPickerSelect
          onValueChange={(value) => setSelectedCity(value)}
          items={cities}
          placeholder={{ label: "Select City", value: null }}
          style={pickerSelectStyles}
          disabled={!cities.length}
        />

        {/* Category Picker */}
        <RNPickerSelect
          onValueChange={(value) => setSelectedCategory(value)}
          items={categories}
          placeholder={{ label: "Select Category", value: null }}
          style={pickerSelectStyles}
          disabled={!categories.length}
        />

        {/* Next Button */}
        <Button mode="contained" style={styles.button} onPress={handleNext}>
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF",
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    marginBottom: 10,
  },
};
