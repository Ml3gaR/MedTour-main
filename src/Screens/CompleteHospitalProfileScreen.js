import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db, auth } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function CompleteFacilityProfileScreen({ navigation }) {
  const [hospitalImage, setHospitalImage] = useState(null);
  const [price, setPrice] = useState("");
  const [distance, setDistance] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFacilityData = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "No user found.");
          navigation.goBack();
          return;
        }

        const docRef = doc(db, "facilities", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHospitalImage(data.image || null);
          setPrice(data.price || "");
          setDistance(data.distance || "");
          setRating(data.rating || "");
          setDescription(data.description || ""); // Load the description
        }
      } catch (error) {
        console.error("Error fetching facility data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilityData();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setHospitalImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!price || !distance || !rating || !hospitalImage || !description) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user found.");
        return;
      }

      const docRef = doc(db, "facilities", user.uid);
      await updateDoc(docRef, {
        image: hospitalImage,
        price,
        distance,
        rating,
        description, // Save the description
      });

      Alert.alert("Success", "Facility profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating facility profile:", error);
      Alert.alert("Error", "There was an issue updating your profile.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete Facility Profile</Text>

      {/* Image Picker */}
      {hospitalImage && <Image source={{ uri: hospitalImage }} style={styles.image} />}
      <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>
          {hospitalImage ? "Change Facility Image" : "Upload Facility Image"}
        </Text>
      </TouchableOpacity>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Price (SAR)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Distance from Airport (in meters)"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Save Button */}
      <Button title="Save" onPress={handleSave} color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
