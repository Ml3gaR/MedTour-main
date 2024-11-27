import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FlightBookingConfirmation = () => {
  const navigation = useNavigation();

  // Function to handle navigation back to the homepage
  const handleBackToBookings = () => {
    navigation.navigate('MyFlightBookings');
  };

  // Function to handle booking a flight (if applicable)
  const handleBookHotel = () => {
    navigation.navigate('SearchHotelsScreen');
  };

  return (
    <View style={styles.container}>
      {/* Checkmark Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/00C853/checkmark.png' }}
          style={styles.checkIcon}
        />
      </View>

      {/* Confirmation Message */}
      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.messageText}>Your Flight Booking is Confirmed. You now can view your flight booking details.</Text>

      {/* Book Flight Button */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleBookHotel}>
        <Text style={styles.primaryButtonText}>BOOK YOUR HOTEL</Text>
      </TouchableOpacity>

      {/* Back to Homepage Button */}
      <TouchableOpacity style={styles.secondaryButton} onPress={handleBackToBookings}>
        <Text style={styles.secondaryButtonText}>Check Your Flight Bookings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#E0F7FA',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  checkIcon: {
    width: 50,
    height: 50,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginVertical: 15,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 15,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlightBookingConfirmation;
