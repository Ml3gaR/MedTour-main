import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function TreatmentHistoryScreen() {
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatmentHistory = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          Alert.alert('Error', 'No user found.');
          return;
        }

        const recordsRef = collection(db, `users/${userId}/medicalRecords`);
        const snapshot = await getDocs(recordsRef);

        const records = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((record) => record.category === 'treatmentHistory'); // Filter for treatment history

        setTreatmentHistory(records);
      } catch (error) {
        console.error('Error fetching treatment history:', error);
        Alert.alert('Error', 'Could not fetch treatment history.');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentHistory();
  }, []);

  const renderTreatmentCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Treatment</Text>
      <Text style={styles.description}>{item.treatment || 'No details provided.'}</Text>
      <Text style={styles.date}>Added on: {new Date(item.createdAt).toDateString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Treatment History...</Text>
      </View>
    );
  }

  if (treatmentHistory.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Treatment History available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Treatment History</Text>
      <FlatList
        data={treatmentHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderTreatmentCard}
        contentContainerStyle={styles.listContainer}
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
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
});
