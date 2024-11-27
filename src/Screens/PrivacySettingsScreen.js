import React, { useState, useEffect } from "react";
import { View, StyleSheet, Switch, Alert } from "react-native";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firebase for persisting settings
import { auth, db } from "../firebase"; // Ensure Firebase is configured
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";

function PrivacySettingsScreen() {
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const [isDataSharingEnabled, setIsDataSharingEnabled] = useState(false);
  const [isAdPersonalizationEnabled, setIsAdPersonalizationEnabled] = useState(false);

  // Fetch user's privacy settings from the database on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          Alert.alert("Error", "No user found.");
          return;
        }

        const settingsDoc = await getDoc(doc(db, "users", userId, "settings", "privacy"));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          setIsProfileVisible(data.isProfileVisible ?? true);
          setIsDataSharingEnabled(data.isDataSharingEnabled ?? false);
          setIsAdPersonalizationEnabled(data.isAdPersonalizationEnabled ?? false);
        }
      } catch (error) {
        console.error("Error fetching privacy settings:", error);
      }
    };

    fetchSettings();
  }, []);

  // Save the updated settings to the database
  const saveSettings = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "No user found.");
        return;
      }

      await setDoc(
        doc(db, "users", userId, "settings", "privacy"),
        {
          isProfileVisible,
          isDataSharingEnabled,
          isAdPersonalizationEnabled,
        },
        { merge: true }
      );

      Alert.alert("Success", "Privacy settings updated!");
    } catch (error) {
      console.error("Error saving privacy settings:", error);
      Alert.alert("Error", "Could not save your settings.");
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.title}>Privacy Settings</AppText>
      </View>

      {/* Profile Visibility */}
      <View style={styles.settingItem}>
        <AppText style={styles.settingText}>Allow Profile Visibility</AppText>
        <Switch
          trackColor={{ false: colors.light, true: colors.primary }}
          thumbColor={isProfileVisible ? colors.secondary : colors.medium}
          ios_backgroundColor={colors.light}
          onValueChange={(value) => {
            setIsProfileVisible(value);
            saveSettings();
          }}
          value={isProfileVisible}
        />
      </View>

      {/* Data Sharing */}
      <View style={styles.settingItem}>
        <AppText style={styles.settingText}>Enable Data Sharing</AppText>
        <Switch
          trackColor={{ false: colors.light, true: colors.primary }}
          thumbColor={isDataSharingEnabled ? colors.secondary : colors.medium}
          ios_backgroundColor={colors.light}
          onValueChange={(value) => {
            setIsDataSharingEnabled(value);
            saveSettings();
          }}
          value={isDataSharingEnabled}
        />
      </View>

      {/* Ad Personalization */}
      <View style={styles.settingItem}>
        <AppText style={styles.settingText}>Ad Personalization</AppText>
        <Switch
          trackColor={{ false: colors.light, true: colors.primary }}
          thumbColor={isAdPersonalizationEnabled ? colors.secondary : colors.medium}
          ios_backgroundColor={colors.light}
          onValueChange={(value) => {
            setIsAdPersonalizationEnabled(value);
            saveSettings();
          }}
          value={isAdPersonalizationEnabled}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  settingText: {
    fontSize: 18,
    color: colors.dark,
    fontWeight: "bold",
  },
});

export default PrivacySettingsScreen;
