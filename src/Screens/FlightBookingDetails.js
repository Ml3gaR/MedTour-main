import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function FlightBookingDetails() {
  const navigation = useNavigation();
  const route = useRoute();

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
      <View style={styles.card}>
        <Image source={{ uri: carrierLogo }} style={styles.logo} />
        <Text style={styles.carrier}>{carrier}</Text>
        <View style={styles.flightInfoContainer}>
          <Text style={styles.flightRoute}>
            {origin} ➔ {destination}
          </Text>
          <Text style={styles.flightTime}>
            Departure: {departure} | Arrival: {arrival}
          </Text>
          <Text style={styles.flightDuration}>
            Duration: {duration} minutes
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price: {price}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  carrier: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  flightInfoContainer: {
    marginTop: 10,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E1E8ED',
    paddingVertical: 15,
    alignItems: 'center',
  },
  flightRoute: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007BFF',
    marginBottom: 5,
  },
  flightTime: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  flightDuration: {
    fontSize: 16,
    color: '#555',
  },
  priceContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#E1F5FE',
    width: '100%',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  confirmButton: {
    marginTop: 30,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
