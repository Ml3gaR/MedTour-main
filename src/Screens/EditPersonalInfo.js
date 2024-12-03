import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import AppText from "../components/AppText";
import colors from "../config/colors";

export default function EditPersonalInfo() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "", dob: "" });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          Alert.alert("Error", "No user found.");
          return;
        }

        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        } else {
          Alert.alert("Error", "User information not found.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        Alert.alert("Error", "Could not fetch user information.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleSaveChanges = async (field, value) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "No user found.");
        return;
      }

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { [field]: value });

      Alert.alert("Success", `${field} updated successfully!`);
      setUserInfo((prev) => ({ ...prev, [field]: value }));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      Alert.alert("Error", `Could not update ${field}. Please try again.`);
    }
  };

  const renderEditableField = (label, value, field) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(value);

    return (
      <View style={styles.fieldContainer}>
        {isEditing ? (
          <View style={styles.editRow}>
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
              placeholder={`Enter new ${label}`}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                handleSaveChanges(field, newValue);
                setIsEditing(false);
              }}
            >
              <AppText style={styles.saveText}>Save</AppText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.row}
            onPress={() => setIsEditing(true)}
          >
            <View>
              <AppText style={styles.label}>{label}</AppText>
              <AppText style={styles.value}>{value || "Not Provided"}</AppText>
            </View>
            <AppText style={styles.editText}>Edit</AppText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.header}>Edit Personal Info</AppText>

      {/* Editable Fields */}
      {renderEditableField("Name", userInfo.name, "name")}
      {renderEditableField("Email", userInfo.email, "email")}
      {renderEditableField("Phone", userInfo.phoneNumber , "phone")}
      {renderEditableField("Date of Birth", userInfo.dateOfBirth, "dob")}

      {/* Back to Profile Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AppText style={styles.backButtonText}>Back to Profile</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: colors.medium,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark,
  },
  editText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: colors.white,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  saveText: {
    color: colors.white,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

