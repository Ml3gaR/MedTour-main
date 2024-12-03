import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { db, auth } from "../firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

export default function DoctorsListScreen() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of doctors for the logged-in hospital
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user found.");
        return;
      }

      const doctorsCollection = collection(db, `facilities/${user.uid}/doctors`);
      const snapshot = await getDocs(doctorsCollection);

      const doctorsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDoctors(doctorsList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      Alert.alert("Error", "Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  // Remove a doctor from the database
  const removeDoctor = async (doctorId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user found.");
        return;
      }

      await deleteDoc(doc(db, `facilities/${user.uid}/doctors/${doctorId}`));
      Alert.alert("Success", "Doctor removed successfully!");
      setDoctors(doctors.filter((doctor) => doctor.id !== doctorId)); // Update the local state
    } catch (error) {
      console.error("Error removing doctor:", error);
      Alert.alert("Error", "Failed to remove doctor.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Render a single doctor card
  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photoUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.doctorName}</Text>
        <Text style={styles.details}>Specialty: {item.specialty}</Text>
        <Text style={styles.details}>Rating: {item.rating}</Text>
        <Text style={styles.details}>Experience: {item.experience} years</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() =>
          Alert.alert(
            "Confirm Delete",
            `Are you sure you want to remove Dr. ${item.doctorName}?`,
            [
              { text: "Cancel", style: "cancel" },
              { text: "Remove", style: "destructive", onPress: () => removeDoctor(item.id) },
            ]
          )
        }
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctors List</Text>
      {doctors.length > 0 ? (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          renderItem={renderDoctor}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noDoctorsText}>No doctors found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  removeButton: {
    alignSelf: "center",
    backgroundColor: "#FF6B6B",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noDoctorsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
});
