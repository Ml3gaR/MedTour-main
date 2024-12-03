import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { auth, db } from "../firebase"; // Import Firebase
import { collection, getDocs, query, where } from "firebase/firestore";

export default function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    doctorsCount: 0,
    appointmentsCount: 0,
    averageRating: 0,
    specialtiesCount: 0,
  });

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "No user is logged in.");
          return;
        }

        // Fetch doctors data
        const doctorsRef = collection(db, "facilities", user.uid, "doctors");
        const doctorsSnapshot = await getDocs(doctorsRef);
        const doctors = doctorsSnapshot.docs.map((doc) => doc.data());

        const doctorsCount = doctors.length;
        const averageRating =
          doctors.reduce((sum, doctor) => sum + (doctor.rating || 0), 0) / (doctorsCount || 1);
        const specialtiesCount = new Set(doctors.map((doctor) => doctor.specialty)).size;

        // Fetch appointments data
        const appointmentsRef = collection(db, "appointments");
        const appointmentsQuery = query(appointmentsRef, where("hospitalId", "==", user.uid));
        const appointmentsSnapshot = await getDocs(appointmentsQuery);
        const appointmentsCount = appointmentsSnapshot.size;

        // Update state with analytics data
        setAnalyticsData({
          doctorsCount,
          appointmentsCount,
          averageRating: averageRating.toFixed(1), // One decimal
          specialtiesCount,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        Alert.alert("Error", "Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1 }} />;
  }

  const chartData = {
    labels: ["Doctors", "Appointments", "Avg Rating", "Specialties"],
    datasets: [
      {
        data: [
          analyticsData.doctorsCount,
          analyticsData.appointmentsCount,
          analyticsData.averageRating,
          analyticsData.specialtiesCount,
        ],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hospital Analytics</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{analyticsData.doctorsCount}</Text>
          <Text style={styles.cardLabel}>Doctors</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{analyticsData.appointmentsCount}</Text>
          <Text style={styles.cardLabel}>Appointments</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{analyticsData.averageRating}</Text>
          <Text style={styles.cardLabel}>Avg Rating</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{analyticsData.specialtiesCount}</Text>
          <Text style={styles.cardLabel}>Specialties</Text>
        </View>
      </View>

      {/* Bar Chart */}
      <Text style={styles.chartTitle}>Analytics Overview</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#007BFF",
          backgroundGradientFrom: "#007BFF",
          backgroundGradientTo: "#00A6FF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
          alignSelf: "center",
        }}
      />
    </ScrollView>
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
    textAlign: "center",
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
  cardLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
});

