import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function FlightBookingDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Destructure flight data with default values to avoid undefined
  const {
    flightId = '',
    price = '',
    departure = '',
    arrival = '',
    origin = '',
    destination = '',
    carrier = '',
    carrierLogo = '',
    duration = '',
  } = route.params || {};

  const handleConfirmBooking = async () => {
    if (!flightId || !price || !departure || !arrival) {
      Alert.alert('Error', 'Flight details are missing.');
      return;
    }

    const bookingData = {
      flightId,
      price,
      departure,
      arrival,
      origin,
      destination,
      carrier,
      duration,
      userId: auth.currentUser?.uid || 'guest',
      bookingTime: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'bookings'), bookingData);
      Alert.alert('Success', 'Booking confirmed successfully!');
      navigation.navigate('FlightBookingConfirmation');
    } catch (error) {
      console.error('Error saving booking:', error);
      Alert.alert('Error', 'There was an issue saving your booking.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: carrierLogo }} style={styles.logo} />
      <Text style={styles.header}>Confirm Your Booking</Text>
      <Text style={styles.details}>Carrier: {carrier}</Text>
      <Text style={styles.details}>Price: {price}</Text>
      <Text style={styles.details}>Departure: {departure}</Text>
      <Text style={styles.details}>Arrival: {arrival}</Text>
      <Text style={styles.details}>From: {origin} To: {destination}</Text>
      <Text style={styles.details}>Duration: {duration} minutes</Text>
      <Button title="Confirm Booking" onPress={handleConfirmBooking} color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007BFF',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
});
