import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";

function ProfileScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "", dob: "" });

  const fetchUserInfo = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "No user found.");
        return;
      }
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserInfo({
          name: data.name || "Not Provided",
          email: data.email || "Not Provided",
          phone: data.phone || "Not Provided",
          dob: data.dob ? data.dob.split("T")[0] : "Not Provided", // Remove time from date
        });
      } else {
        Alert.alert("Error", "User information not found.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert("Error", "Could not fetch user information.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo(); // Re-fetch user info every time the screen is focused
    }, [])
  );

  const handleLogOut = () =>
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
          } catch (error) {
            console.error("Error logging out:", error);
            Alert.alert("Error", "Could not log out. Please try again.");
          }
        },
      },
    ]);

  return (
    <Screen style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerText}>Profile</AppText>
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        <AppText style={styles.infoLabel}>Name</AppText>
        <AppText style={styles.infoText}>{userInfo.name}</AppText>

        <AppText style={styles.infoLabel}>Email</AppText>
        <AppText style={styles.infoText}>{userInfo.email}</AppText>

        <AppText style={styles.infoLabel}>Phone</AppText>
        <AppText style={styles.infoText}>{userInfo.phone}</AppText>

        <AppText style={styles.infoLabel}>Date of Birth</AppText>
        <AppText style={styles.infoText}>{userInfo.dob}</AppText>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("EditPersonalInfo")}
      >
        <AppText style={styles.actionText}>     Edit Personal Info</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("PrivacySettingsScreen")}
      >
        <AppText style={styles.actionText}>     Manage Privacy Settings</AppText>
      </TouchableOpacity>

     

      <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate("AboutMedTourScreen")}>
        <AppText style={styles.aboutText}>About MedTour</AppText>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <AppText style={styles.logoutText}>LOG OUT</AppText>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.medium,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 15,
  },
  actionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  actionText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
  aboutButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
  },
  aboutText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: colors.danger,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
