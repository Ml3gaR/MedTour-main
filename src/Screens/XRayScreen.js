import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function XRayScreen() {
  const [xrayRecords, setXrayRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchXRayRecords = async () => {
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
          .filter((record) => record.category === 'xray'); // Filter for X-Ray records

        setXrayRecords(records);
      } catch (error) {
        console.error('Error fetching X-Ray records:', error);
        Alert.alert('Error', 'Could not fetch X-Ray records.');
      } finally {
        setLoading(false);
      }
    };

    fetchXRayRecords();
  }, []);

  const handlePressXRay = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const renderXRayRecord = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePressXRay(item.imageUri)}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.description || 'Unnamed X-Ray'}</Text>
        <Text style={styles.date}>Added on: {new Date(item.createdAt).toDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading X-Ray Records...</Text>
      </View>
    );
  }

  if (xrayRecords.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No X-Ray Records available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>X-Ray Records</Text>
      <FlatList
        data={xrayRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderXRayRecord}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal for Image Display */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        </View>
      </Modal>
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
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
