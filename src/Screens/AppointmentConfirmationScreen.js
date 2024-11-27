import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppointmentConfirmationScreen = () => {
  const navigation = useNavigation();

  const handleAddMedicalRecordAndBookFlight = () => {
    navigation.navigate('AddMedicalRecordScreen');
  };

  const handleContinueToFlightBooking = () => {
    navigation.navigate('BookFlightScreen');
  };

  return (
    <View style={styles.container}>
    

      {/* Confirmation Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/00C853/checkmark.png' }}
          style={styles.checkIcon}
        />
      </View>

      {/* Confirmation Message */}
      <Text style={styles.congratsText}>Appointment Confirmed!</Text>
      <Text style={styles.messageText}>
        Your appointment has been successfully scheduled. What's next?
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleAddMedicalRecordAndBookFlight}
      >
        <Text style={styles.primaryButtonText}>Add Medical Record & Book Flight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleContinueToFlightBooking}
      >
        <Text style={styles.secondaryButtonText}>Continue to Flight Booking</Text>
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
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  timelineStep: {
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#007BFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineStepText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timelineLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#777',
  },
  timelineLine: {
    height: 2,
    width: 30,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
    textAlign: 'center',
  },
});

export default AppointmentConfirmationScreen;
