import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Icons for categories
const categoryIcons = {
  xray: require('../assets/xray.webp'), // Replace with actual assets
  testResult: require('../assets/test_result.webp'),
  prescription: require('../assets/prescription.webp'),
  imaging: require('../assets/imaging.webp'),
  treatmentHistory: require('../assets/treatment.webp'),
  diagnosis: require('../assets/diagnosis.webp'),
};

// Category names
const categoryNames = {
  xray: 'XRay',
  testResult: 'TestResults',
  prescription: 'Prescriptions',
  imaging: 'Imaging',
  treatmentHistory: 'TreatmentHistory',
  diagnosis: 'Diagnosis',
};

export default function MedicalRecordsVaultScreen() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          Alert.alert('Error', 'No user found.');
          return;
        }

        const recordsRef = collection(db, `users/${userId}/medicalRecords`);
        const snapshot = await getDocs(recordsRef);

        const records = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMedicalRecords(records);
      } catch (error) {
        console.error('Error fetching medical records:', error);
        Alert.alert('Error', 'Could not fetch medical records.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  const categorizedRecords = () => {
    const categories = Object.keys(categoryNames).reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {});

    medicalRecords.forEach((record) => {
      const { category } = record;
      if (categories[category]) {
        categories[category].push(record);
      }
    });

    return categories;
  };

  const handleCategoryPress = (category) => {
    const recordsInCategory = categorizedRecords()[category];
    navigation.navigate(`${categoryNames[category]}Screen`, { category, records: recordsInCategory });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Medical Records...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medical Records Vault</Text>
      <FlatList
        data={Object.keys(categoryIcons)}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category)}
          >
            <Image source={categoryIcons[category]} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{categoryNames[category]}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  categoryIcon: {
    width: 160,
    height: 160,
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
