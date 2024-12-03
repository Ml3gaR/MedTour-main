import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default function AppointmentScheduleScreen({ route, navigation }) {
  const { doctorId, hospitalId } = route.params || {};
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const timeSlots = [
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
  ];

  useEffect(() => {
    fetchBookedSlots();
  }, [selectedDate]);

  const fetchBookedSlots = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef,
        where('doctorId', '==', doctorId),
        where('hospitalId', '==', hospitalId),
        where('date', '==', selectedDate.toDateString())
      );
      const querySnapshot = await getDocs(q);

      const booked = querySnapshot.docs.map((doc) => doc.data().time);
      setBookedSlots(booked);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const handleDateChange = (event, selectedDateValue) => {
    const currentDate = selectedDateValue || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleBookNow = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      Alert.alert('Error', 'Please select a date and time slot.');
      return;
    }

    if (bookedSlots.includes(selectedTimeSlot)) {
      Alert.alert('Error', 'This timeslot is already booked.');
      return;
    }

    try {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        Alert.alert('Error', 'User not logged in.');
        return;
      }

      const appointmentData = {
        userId,
        doctorId,
        hospitalId,
        date: selectedDate.toDateString(),
        time: selectedTimeSlot,
        bookingTimestamp: new Date().toISOString(),
      };

      await addDoc(collection(db, 'appointments'), appointmentData);

      Alert.alert('Success', 'Your appointment has been booked!');
      navigation.navigate('AppointmentConfirmationScreen');
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Error', 'Could not book your appointment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointment</Text>

      <Text style={styles.sectionTitle}>Select Date</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>
          {selectedDate ? selectedDate.toDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      <Text style={styles.sectionTitle}>Available Slots</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.timeSlot,
              bookedSlots.includes(slot) ? styles.bookedTimeSlot : null,
              selectedTimeSlot === slot && !bookedSlots.includes(slot)
                ? styles.selectedTimeSlot
                : null,
            ]}
            onPress={() => !bookedSlots.includes(slot) && setSelectedTimeSlot(slot)}
            disabled={bookedSlots.includes(slot)}
          >
            <Text
              style={[
                styles.timeSlotText,
                bookedSlots.includes(slot) ? styles.bookedTimeSlotText : null,
                selectedTimeSlot === slot && !bookedSlots.includes(slot)
                  ? styles.selectedTimeSlotText
                  : null,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>BOOK NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerText: {
    color: '#333',
    fontSize: 16,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeSlot: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    elevation: 2,
  },
  bookedTimeSlot: {
    backgroundColor: '#D3D3D3',
  },
  selectedTimeSlot: {
    backgroundColor: '#007BFF',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  bookedTimeSlotText: {
    color: '#A9A9A9',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
