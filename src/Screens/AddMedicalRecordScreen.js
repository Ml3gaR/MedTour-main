import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddMedicalRecordScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [newRecordIds, setNewRecordIds] = useState([]); // Track new record IDs for current session

  const categories = [
    { label: 'X-Ray', value: 'xray' },
    { label: 'Test Result', value: 'testResult' },
    { label: 'Prescription', value: 'prescription' },
    { label: 'Imaging', value: 'imaging' },
    { label: 'Treatment History', value: 'treatmentHistory' },
    { label: 'Diagnosis', value: 'diagnosis' },
  ];

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddRecord = async () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category.');
      return;
    }

    if (['xray', 'testResult', 'imaging', 'prescription'].includes(selectedCategory) && !image) {
      Alert.alert('Error', 'Please upload an image for the selected category.');
      return;
    }

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert('Error', 'No user found.');
        return;
      }

      const recordData = {
        category: selectedCategory,
        ...formData,
        imageUri: image || null,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, `users/${userId}/medicalRecords`), recordData);
      setNewRecordIds((prevIds) => [...prevIds, docRef.id]); // Store the new record ID

      Alert.alert('Success', 'Medical record added successfully.');
      setFormData({});
      setImage(null);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error adding medical record:', error);
      Alert.alert('Error', 'Could not add the medical record. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Medical Record</Text>

      {/* Category Dropdown */}
      <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={categories}
        placeholder={{ label: 'Select Category', value: null }}
        style={pickerSelectStyles}
      />

      {/* Dynamic Fields Based on Category */}
      {selectedCategory === 'xray' && (
        <TextInput
          style={styles.input}
          placeholder="X-Ray Description"
          value={formData.description || ''}
          onChangeText={(text) => handleFieldChange('description', text)}
        />
      )}
      {selectedCategory === 'testResult' && (
        <TextInput
          style={styles.input}
          placeholder="Test Name"
          value={formData.testName || ''}
          onChangeText={(text) => handleFieldChange('testName', text)}
        />
      )}
      {selectedCategory === 'prescription' && (
        <TextInput
          style={styles.input}
          placeholder="Prescribed Medication"
          value={formData.medication || ''}
          onChangeText={(text) => handleFieldChange('medication', text)}
        />
      )}
      {selectedCategory === 'imaging' && (
        <TextInput
          style={styles.input}
          placeholder="Imaging Type (e.g., MRI, CT Scan)"
          value={formData.imagingType || ''}
          onChangeText={(text) => handleFieldChange('imagingType', text)}
        />
      )}
      {selectedCategory === 'treatmentHistory' && (
        <TextInput
          style={styles.input}
          placeholder="Treatment Description"
          value={formData.treatment || ''}
          onChangeText={(text) => handleFieldChange('treatment', text)}
          multiline
        />
      )}
      {selectedCategory === 'diagnosis' && (
        <TextInput
          style={styles.input}
          placeholder="Diagnosis Details"
          value={formData.diagnosis || ''}
          onChangeText={(text) => handleFieldChange('diagnosis', text)}
          multiline
        />
      )}

      {/* Image Upload */}
      {['xray', 'testResult', 'imaging', 'prescription'].includes(selectedCategory) && (
        <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
          <Text style={styles.imagePickerText}>
            {image ? 'Change Image' : 'Upload Image'}
          </Text>
        </TouchableOpacity>
      )}

      {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleAddRecord}>
        <Text style={styles.saveButtonText}>Save Record</Text>
      </TouchableOpacity>

      {/* Navigate to Summary */}
      <TouchableOpacity
        style={styles.summaryButton}
        onPress={() => navigation.navigate('MedicalRecordSummaryScreen', { newRecordIds })}
      >
        <Text style={styles.summaryButtonText}>Go to Summary</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007BFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
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
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summaryButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
};
