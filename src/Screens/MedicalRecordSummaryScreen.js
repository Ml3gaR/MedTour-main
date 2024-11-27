import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function MedicalRecordSummaryScreen({ route, navigation }) {
  const { newRecordIds } = route.params || {}; // Retrieve the new record IDs passed from AddMedicalRecordScreen
  const [newRecords, setNewRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewRecords = async () => {
      try {
        if (!newRecordIds || newRecordIds.length === 0) {
          Alert.alert('No Records', 'No new medical records to display.');
          return;
        }

        const userId = auth.currentUser?.uid;
        if (!userId) {
          Alert.alert('Error', 'No user found.');
          return;
        }

        const records = [];
        for (const recordId of newRecordIds) {
          const recordRef = doc(db, `users/${userId}/medicalRecords`, recordId);
          const recordSnap = await getDoc(recordRef);
          if (recordSnap.exists()) {
            records.push({ id: recordId, ...recordSnap.data() });
          }
        }

        setNewRecords(records);
      } catch (error) {
        console.error('Error fetching new medical records:', error);
        Alert.alert('Error', 'Could not fetch the new medical records.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewRecords();
  }, [newRecordIds]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (newRecords.length === 0) {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={styles.noRecordText}>No new medical records found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Medical Record Summary</Text>
      {newRecords.map((record) => (
        <View key={record.id} style={styles.card}>
          {record.imageUri && <Image source={{ uri: record.imageUri }} style={styles.recordImage} />}
          <View style={styles.detailsContainer}>
            {record.category && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Category:</Text> {record.category}
              </Text>
            )}
            {record.description && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Description:</Text> {record.description}
              </Text>
            )}
            {record.testName && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Test Name:</Text> {record.testName}
              </Text>
            )}
            {record.medication && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Medication:</Text> {record.medication}
              </Text>
            )}
            {record.imagingType && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Imaging Type:</Text> {record.imagingType}
              </Text>
            )}
            {record.treatment && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Treatment History:</Text> {record.treatment}
              </Text>
            )}
            {record.diagnosis && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Diagnosis:</Text> {record.diagnosis}
              </Text>
            )}
          </View>
        </View>
      ))}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('BookFlightScreen')}
        >
          <Text style={styles.primaryButtonText}>Continue to Flight Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.secondaryButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  recordImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#777',
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    fontSize: 18,
    color: '#777',
  },
});
