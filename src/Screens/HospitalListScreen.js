import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import HospitalCard from "../components/cards/HospitalCard"; // Updated to use the new card component

export default function HospitalListScreen({ route, navigation }) {
  const { country, city, category } = route.params; // Get filters from navigation params
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const q = query(
          collection(db, "facilities"),
          where("country", "==", country),
          where("city", "==", city),
          where("clinicType", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const hospitalList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHospitals(hospitalList);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [country, city, category]);

  const handleHospitalPress = (hospital) => {
    navigation.navigate("HospitalDetailsScreen", { hospitalId: hospital.id });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1 }} />;
  }

  if (hospitals.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No hospitals found for the selected filters.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={hospitals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HospitalCard
          image={{ uri: item.image || "https://via.placeholder.com/150" }} // Placeholder if no image
          name={item.hospitalName}
          specialist={item.clinicType}
          distance={item.distance || "N/A"} // Optional: Add distance field to Firestore if needed
          price={item.price || "N/A"} // Optional: Add price field to Firestore if needed
          rating={item.rating || "N/A"} // Optional: Add rating field to Firestore if needed
          onPress={() => handleHospitalPress(item)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
});
