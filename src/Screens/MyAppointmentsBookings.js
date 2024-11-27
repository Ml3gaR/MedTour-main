import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function MyAppointmentsBookings() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      // Fetch all appointments for the logged-in user
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "User not logged in.");
        return;
      }

      const querySnapshot = await getDocs(
        collection(db, "appointments")
      );

      // Fetch associated hospital and doctor details
      const appointmentList = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const appointment = docSnap.data();
          const doctorRef = doc(
            db,
            `facilities/${appointment.hospitalId}/doctors`,
            appointment.doctorId
          );
          const hospitalRef = doc(db, "facilities", appointment.hospitalId);

          const doctorSnap = await getDoc(doctorRef);
          const hospitalSnap = await getDoc(hospitalRef);

          return {
            id: docSnap.id,
            doctorName: doctorSnap.exists() ? doctorSnap.data().doctorName : "Unknown Doctor",
            hospitalName: hospitalSnap.exists() ? hospitalSnap.data().hospitalName : "Unknown Hospital",
            date: appointment.date,
            time: appointment.time,
          };
        })
      );

      setAppointments(appointmentList);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Alert.alert("Error", "There was an issue fetching your appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have no appointments yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* Doctor Details */}
          <Text style={styles.hospitalName}>{item.hospitalName}</Text>
          <Text style={styles.doctorName}>Doctor: {item.doctorName}</Text>

          {/* Appointment Date and Time */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.date}>📅 {item.date}</Text>
            <Text style={styles.time}>⏰ {item.time}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 14,
    color: "#333",
  },
  time: {
    fontSize: 14,
    color: "#333",
  },
});
