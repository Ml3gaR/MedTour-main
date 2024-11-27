import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddDoctorScreen({ route, navigation }) {
  const { hospitalId } = route.params || {};

  if (!hospitalId) {
    Alert.alert('Error', 'No hospital ID found. Please try again.');
    navigation.goBack();
    return null;
  }

  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [rating, setRating] = useState('');
  const [photo, setPhoto] = useState(null);

  const specialties = [
    { label: 'Cardiology', value: 'Cardiology' },
    { label: 'Pediatrics', value: 'Pediatrics' },
    { label: 'Orthopedics', value: 'Orthopedics' },
    { label: 'Neurology', value: 'Neurology' },
    { label: 'Dermatology', value: 'Dermatology' },
  ];

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleAddDoctor = async () => {
    if (!doctorName || !specialty || !experience || !rating || !photo) {
      Alert.alert('Error', 'Please fill in all fields and upload a photo.');
      return;
    }

    try {
      const doctorData = {
        doctorName,
        specialty,
        experience,
        rating: parseFloat(rating), // Ensure rating is stored as a number
        photoUrl: photo, // Renamed for clarity
        hospitalId, // Keep a reference to the hospital
      };

      console.log('Adding Doctor Data:', doctorData);

      await addDoc(collection(db, `facilities/${hospitalId}/doctors`), doctorData);

      Alert.alert('Success', 'Doctor added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding doctor:', error);
      Alert.alert('Error', 'Could not add doctor. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Doctor</Text>
      <RNPickerSelect
        onValueChange={setSpecialty}
        items={specialties}
        placeholder={{ label: 'Select Specialty', value: null }}
        style={pickerSelectStyles}
      />
      <TextInput
        style={styles.input}
        placeholder="Doctor Name"
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience (in years)"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Pick Doctor's Photo</Text>
      </TouchableOpacity>
      <Button title="Add Doctor" onPress={handleAddDoctor} color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  imagePicker: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
};