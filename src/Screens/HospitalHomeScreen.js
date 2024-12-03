import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase"; // Firebase for authentication and database
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function HospitalHomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hospitalData, setHospitalData] = useState(null);
  const [stats, setStats] = useState({
    doctors: 0, // Default value for total doctors
    pendingPermissions: 0, // Default value for pending permissions
  });

  const actions = [
    { id: "1", label: "Add Doctor", screen: "AddDoctorScreen", icon: "➕" },
    { id: "2", label: "Manage Doctors", screen: "DoctorsListScreen", icon: "🩺" },
    { id: "4", label: "Patient Appointments", screen: "PatientsAppointmentsScreen", icon: "📅" },
    { id: "5", label: "Analytics", screen: "AnalyticsScreen", icon: "📊" },
    { id: "6", label: "Logout", screen: "LoginScreen", icon: "↪️" },
  ];

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "No user is logged in.");
          navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
          return;
        }

        const hospitalDoc = await getDoc(doc(db, "facilities", user.uid));
        if (hospitalDoc.exists()) {
          const data = hospitalDoc.data();
          setHospitalData(data);
          setStats({
            doctors: data.doctorsCount || 0, // Update total doctors from database
            pendingPermissions: data.pendingPermissions || 0, // Update pending permissions
          });
        } else {
          Alert.alert("Error", "No hospital data found. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        Alert.alert("Error", "Failed to fetch hospital data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Success", "Logged out successfully!");
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const renderStatCard = ({ label, value }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderAction = ({ item }) => (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={() => {
        if (item.id === "6") handleLogout(); // Use logout for Edit Account if needed
        else navigation.navigate(item.screen, { hospitalId: auth.currentUser.uid });
      }}
    >
      <Text style={styles.actionIcon}>{item.icon}</Text>
      <Text style={styles.actionLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      

      <Text style={styles.title}>Actions</Text>

      <FlatList
        data={actions}
        keyExtractor={(item) => item.id}
        renderItem={renderAction}
        numColumns={2}
        style={styles.actionsContainer}
      />
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
    color: "#007BFF",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  actionIcon: {
    fontSize: 30,
    color: "#007BFF",
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

