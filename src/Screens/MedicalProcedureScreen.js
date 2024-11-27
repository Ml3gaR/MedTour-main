import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-paper";
import axios from "axios";

export default function MedicalProcedureScreen({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [category, setCategory] = useState("");

  // Fetch countries and cities
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
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
    setCities(
      selected?.cities.map((city) => ({ label: city, value: city })) || []
    );
  };

  const handleNext = () => {
    if (!selectedCountry || !selectedCity || !category) {
      Alert.alert("Error", "Please select all fields!");
      return;
    }

    // Navigate to HospitalListScreen with the selected filters
    navigation.navigate("HospitalListScreen", {
      country: selectedCountry,
      city: selectedCity,
      category: category,
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
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: "Cardiology", value: "Cardiology" },
            { label: "Pediatrics", value: "Pediatrics" },
            { label: "Orthopedics", value: "Orthopedics" },
          ]}
          placeholder={{ label: "Select Category", value: null }}
          style={pickerSelectStyles}
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
