import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FlightCard = ({ id, price, departure, arrival, origin, destination, carrier, carrierLogo, duration }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the FlightBookingDetails screen with flight data
    navigation.navigate("FlightBookingDetails", {
      flightId: id,
      price,
      departure,
      arrival,
      origin,
      destination,
      carrier,
      carrierLogo,
      duration,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Text style={styles.price}>Price: {price}</Text>
      <Text style={styles.details}>Departure: {departure}</Text>
      <Text style={styles.details}>Arrival: {arrival}</Text>
      <Text style={styles.details}>From: {origin} To: {destination}</Text>
      <Text style={styles.details}>Duration: {duration} minutes</Text>
      <Text style={styles.details}>Carrier: {carrier}</Text>
      <Image source={{ uri: carrierLogo }} style={styles.logo} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
});

export default FlightCard;
