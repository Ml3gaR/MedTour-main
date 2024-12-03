import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

// Shortcut data
const shortcuts = [
  {
    id: "1",
    title: "Book Appointment",
    route: "MedicalProcedureScreen",
    icon: require("../assets/bookappointment.jpg"),
  },
  {
    id: "2",
    title: "Find Hotels",
    route: "SearchHotelsScreen",
    icon: require("../assets/bookhotel.jpg"),
  },
  {
    id: "3",
    title: "Book Flight",
    route: "BookFlightScreen",
    icon: require("../assets/bookflight.webp"),
  },
  {
    id: "4",
    title: "Medical Records Vault",
    route: "MedicalRecordsVaultScreen",
    icon: require("../assets/medicalrecords.webp"),
  },
];

// Main Function
export default function HomeScreen() {
  const navigation = useNavigation();

  // Render Shortcut Card
  const renderShortcut = ({ item }) => (
    <TouchableOpacity
      style={styles.shortcutCard}
      onPress={() => navigation.navigate(item.route)}
    >
      <Image source={item.icon} style={styles.shortcutIcon} />
      <Text style={styles.shortcutText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to MedTour</Text>
        <Text style={styles.subtitle}>Plan your journey with ease</Text>
      </View>

      {/* Plan Your Medical Trip */}
      <TouchableOpacity
        style={styles.planTripCard}
        onPress={() => navigation.navigate("MedicalProcedureScreen")}
      >
        <Image
          source={require("../assets/medicaltrip.jpg")}
          style={styles.planTripImage}
        />
        <Text style={styles.planTripText}>Plan Your Medical Trip</Text>
        <Text style={styles.planTripSubtitle}>
          Start by booking an appointment, then arrange flights and hotels.
        </Text>
      </TouchableOpacity>

      {/* Shortcuts Section */}
      <View style={styles.shortcutsSection}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <FlatList
          data={shortcuts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderShortcut}
          columnWrapperStyle={styles.shortcutRow}
        />
      </View>

      {/* Suggestions/Promotions Section */}
      <View style={styles.suggestionsSection}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <View style={styles.suggestionCard}>
          <Image
            source={require("../assets/kingsaudhospital.jpeg")}
            style={styles.suggestionImage}
          />
          <View style={styles.suggestionDetails}>
            <Text style={styles.suggestionTitle}>King Saud University Medical City</Text>
            <Text style={styles.suggestionDescription}>
            King Saud University Medical City - Known for its outstanding cardiology department.
            </Text>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => navigation.navigate("HospitalDetailsScreen")}
            >
              <Text style={styles.suggestionButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    marginTop: 25,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  planTripCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  planTripImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  planTripText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 15,
  },
  planTripSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  shortcutsSection: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  shortcutRow: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  shortcutCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    width: (width - 60) / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  shortcutIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  shortcutText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  suggestionsSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  suggestionCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  suggestionImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  suggestionDetails: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  suggestionDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  suggestionButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  suggestionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
