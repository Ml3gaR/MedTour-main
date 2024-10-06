import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-paper';
import axios from 'axios';

export default function MedicalProcedureScreen() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [category, setCategory] = useState('');
  const [loadingCities, setLoadingCities] = useState(false);

  const GEO_API_KEY = 'ec1bab343dmshc0d2b5ad5ff2e1fp10256bjsn0c25ef7effad';
  
  // Fetch countries from the REST Countries API
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryList = response.data.map((country) => ({
          label: country.name.common,
          value: country.cca2,  // Use 2-letter country code for GeoDB
        }));
        setCountries(countryList);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Fetch cities based on selected country
  const handleCountryChange = async (countryCode) => {
    setSelectedCountry(countryCode);
    setLoadingCities(true);
  

    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: { countryIds: countryCode },  // Add country code as query parameter
      headers: {
        'x-rapidapi-key': GEO_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    };
  
    try {
      const response = await axios.request(options);
      const cityList = response.data.data.map(city => ({
        label: city.name,
        value: city.name,
      }));
      setCities(cityList);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoadingCities(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Medical Procedure</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.subHeader}>Select Your Destination and The Medical Procedure</Text>
        
        {/* Country Picker */}
        <RNPickerSelect
          onValueChange={handleCountryChange}
          items={countries}
          placeholder={{ label: 'Select Destination', value: null }}
          style={pickerSelectStyles}
        />
        
        {/* City Picker */}
        {loadingCities ? (
          <ActivityIndicator size="small" color="#007BFF" />
        ) : (
          <RNPickerSelect
            onValueChange={(value) => setSelectedCity(value)}
            items={cities}
            placeholder={{ label: 'Select City', value: null }}
            style={pickerSelectStyles}
            disabled={cities.length === 0}
          />
        )}
        
        {/* Category Picker */}
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: 'Cardiologist', value: 'Cardiologist' },
            { label: 'Dentist', value: 'Dentist' },
            { label: 'Neurologist', value: 'Neurologist' },
          ]}
          placeholder={{ label: 'Select category', value: null }}
          style={pickerSelectStyles}
        />
        
        {/* Next Button */}
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log({ selectedCountry, selectedCity, category })}
        >
          Next
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={styles.logoText}>MEDTOUR</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  subHeader: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
}; 