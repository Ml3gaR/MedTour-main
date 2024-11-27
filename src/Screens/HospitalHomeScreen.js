import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'; // Import Firebase
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function HospitalHomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hospitalData, setHospitalData] = useState(null);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Error', 'No user is logged in.');
          navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
          return;
        }

        const hospitalDoc = await getDoc(doc(db, 'facilities', user.uid));
        if (hospitalDoc.exists()) {
          setHospitalData(hospitalDoc.data());
        } else {
          Alert.alert('Error', 'No hospital data found. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
        Alert.alert('Error', 'Failed to fetch hospital data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Logged out successfully!');
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/MedTourLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome, {hospitalData?.hospitalName || 'Hospital'}</Text>
      </View>

      {/* Dashboard Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('AddDoctorScreen', { hospitalId: auth.currentUser.uid })}
        >
          <Text style={styles.optionText}>Add Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('DoctorsListScreen', { hospitalId: auth.currentUser.uid })}
        >
          <Text style={styles.optionText}>View Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('CompleteFacilityProfileScreen', { hospitalId: auth.currentUser.uid })}
        >
          <Text style={styles.optionText}>View/Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleLogout}
        >
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  optionCard: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
