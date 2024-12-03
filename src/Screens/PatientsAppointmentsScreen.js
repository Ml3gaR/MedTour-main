import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

export default function PatientsAppointmentsScreen() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "No user is logged in.");
          return;
        }

        // Query appointments for the current hospital
        const appointmentsRef = collection(db, "appointments");
        const appointmentsQuery = query(
          appointmentsRef,
          where("hospitalId", "==", user.uid)
        );
        const appointmentsSnapshot = await getDocs(appointmentsQuery);

        const fetchedAppointments = [];

        for (const appointmentDoc of appointmentsSnapshot.docs) {
          const appointmentData = appointmentDoc.data();

          // Fetch user name
          const userDoc = await getDoc(doc(db, "users", appointmentData.userId));
          const userName = userDoc.exists() ? userDoc.data().name : "Unknown User";

          // Fetch doctor name from nested subcollection
          const doctorDoc = await getDoc(
            doc(db, `facilities/${user.uid}/doctors/${appointmentData.doctorId}`)
          );
          const doctorName = doctorDoc.exists()
            ? doctorDoc.data().doctorName
            : "Unknown Doctor";

          fetchedAppointments.push({
            id: appointmentDoc.id,
            date: appointmentData.date,
            time: appointmentData.time,
            userName,
            doctorName,
          });
        }

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        Alert.alert("Error", "Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1 }} />;
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No appointments found.</Text>
      </View>
    );
  }

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Date:</Text> {item.date}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Time:</Text> {item.time}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Patient:</Text> {item.userName}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Doctor:</Text> {item.doctorName}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patients Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#555",
  },
});
