import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import DoctorCard from '../components/cards/DoctorCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function BookDoctorScreen({ route, navigation }) {
  const { hospitalId } = route.params || {};
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!hospitalId) {
    Alert.alert('Error', 'No hospital ID provided. Please try again.');
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRef = collection(db, `facilities/${hospitalId}/doctors`);
        const querySnapshot = await getDocs(doctorsRef);
        const fetchedDoctors = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        Alert.alert('Error', 'Unable to fetch doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [hospitalId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (doctors.length === 0) {
    return (
      <View style={styles.noDoctorsContainer}>
        <Text style={styles.noDoctorsText}>No doctors found for this facility.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Doctor</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() => navigation.navigate('AppointmentScheduleScreen', { doctorId: item.id, hospitalId })}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDoctorsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDoctorsText: {
    fontSize: 18,
    color: '#555',
  },
  listContent: {
    paddingBottom: 20,
  },
});
