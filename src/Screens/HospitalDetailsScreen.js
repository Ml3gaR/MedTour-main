import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function HospitalDetailsScreen({ route, navigation }) {
  const { hospitalId } = route.params || {};

  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        if (!hospitalId) {
          Alert.alert("Error", "No hospital ID found.");
          navigation.goBack();
          return;
        }

        const docRef = doc(db, "facilities", hospitalId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHospitalData(docSnap.data());
        } else {
          Alert.alert("Error", "No details found for this hospital.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error fetching hospital details:", error);
        Alert.alert("Error", "An issue occurred while fetching details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [hospitalId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!hospitalData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hospital details available.</Text>
      </View>
    );
  }

  const {
    hospitalName,
    image,
    description,
    price,
    distance,
    rating,
    address,
    clinicType,
  } = hospitalData;

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      {image ? (
        <Image source={{ uri: image }} style={styles.headerImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}

      {/* Hospital Name */}
      <View style={styles.infoContainer}>
        <Text style={styles.hospitalName}>{hospitalName}</Text>
        <Text style={styles.clinicType}>{clinicType}</Text>
      </View>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>⭐ {rating || "N/A"}</Text>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Details</Text>
        <Text style={styles.detailsText}>{description || "No description available."}</Text>
      </View>

      {/* Address Section */}
      <View style={styles.addressContainer}>
        <Text style={styles.detailsTitle}>Address</Text>
        <Text style={styles.detailsText}>{address || "No address available."}</Text>
        <Text style={styles.detailsText}>
          Distance from Airport: {distance || "N/A"}m
        </Text>
      </View>

      {/* Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Price: SAR {price || "N/A"}</Text>
      </View>

      {/* Book with Doctors Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate("BookDoctorScreen", { hospitalId })}
      >
        <Text style={styles.bookButtonText}>Book with Our Doctors</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  hospitalName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007BFF",
  },
  clinicType: {
    fontSize: 16,
    color: "#6e6e6e",
    marginTop: 5,
  },
  ratingContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  ratingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f39c12",
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  addressContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  priceContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  bookButton: {
    margin: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
