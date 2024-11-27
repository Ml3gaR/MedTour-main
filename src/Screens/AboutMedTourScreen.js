import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import colors from "../config/colors";

export default function AboutMedTourScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* MedTour Logo */}
      <Image
        source={require("../assets/MedTourLogo.png")} // Make sure this path is correct
        style={styles.logo}
      />

      {/* Header */}
      <Text style={styles.header}>About MedTour</Text>

      {/* About Description */}
      <Text style={styles.description}>
        MedTour is a comprehensive mobile application designed to streamline the process of medical tourism.
        Whether you're looking to schedule appointments, book flights, find accommodations, or manage your medical
        records, MedTour has you covered. By integrating multiple features, MedTour simplifies the journey for
        patients traveling for healthcare purposes.
      </Text>

      {/* Key Features */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresHeader}>Key Features:</Text>
        <Text style={styles.feature}>- Book medical appointments at top hospitals.</Text>
        <Text style={styles.feature}>- Search and book flights with ease.</Text>
        <Text style={styles.feature}>- Find and reserve accommodations near hospitals.</Text>
        <Text style={styles.feature}>- Manage and access your medical records securely.</Text>
        <Text style={styles.feature}>- User-friendly design with seamless navigation.</Text>
      </View>

      {/* Acknowledgments */}
      <Text style={styles.acknowledgment}>
        This application was developed as a graduation project by Sultan Alhaqan and Osama Alghamdi. We are committed
        to delivering a platform that enhances the experience of medical tourism for users worldwide.
      </Text>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for using MedTour!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.light,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: colors.dark,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: 20,
    alignSelf: "stretch",
    paddingHorizontal: 10,
  },
  featuresHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 5,
    lineHeight: 22,
  },
  acknowledgment: {
    fontSize: 16,
    color: colors.medium,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  footer: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginTop: 20,
  },
});
