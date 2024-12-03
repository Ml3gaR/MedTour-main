import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const SearchHotelsScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);

  // Function to fetch destination ID
  const fetchDestId = async (cityName) => {
    if (!cityName || cityName.trim() === '') {
      Alert.alert('Error', 'Please enter a valid city');
      return null;
    }

    try {
      console.log('Fetching destination ID for city:', cityName);
      const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations', {
        params: { name: cityName.trim(), locale: 'en-gb' },
        headers: {
          'x-rapidapi-key': 'ec1bab343dmshc0d2b5ad5ff2e1fp10256bjsn0c25ef7effad',
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
        },
      });

      if (response.data && response.data.length > 0) {
        const cityData = response.data.find(item => item.dest_type === 'city');
        if (cityData) return cityData.dest_id;
        else Alert.alert('City not found!');
      }
      return null;
    } catch (error) {
      console.error('Error fetching destination ID:', error);
      Alert.alert('Error fetching destination ID');
      return null;
    }
  };

  // Handle the search button click
  const handleSearch = async () => {
    if (!city || !checkInDate || !checkOutDate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const destId = await fetchDestId(city);
    if (destId) {
      navigation.navigate('HotelsListScreen', {
        destId,
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
        rooms,
        adults,
      });
    }
  };

  // Date picker handlers
  const onCheckInDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkInDate;
    setShowCheckInPicker(false);
    setCheckInDate(currentDate);
  };

  const onCheckOutDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkOutDate;
    setShowCheckOutPicker(false);
    setCheckOutDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter City</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Riyadh"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      {/* Check-in Date Picker */}
      <Text style={styles.label}>Check-in Date</Text>
      <TouchableOpacity onPress={() => setShowCheckInPicker(true)}>
        <Text style={styles.dateText}>{checkInDate.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showCheckInPicker && (
        <DateTimePicker
          value={checkInDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onCheckInDateChange}
        />
      )}

      {/* Check-out Date Picker */}
      <Text style={styles.label}>Check-out Date</Text>
      <TouchableOpacity onPress={() => setShowCheckOutPicker(true)}>
        <Text style={styles.dateText}>{checkOutDate.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOutDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onCheckOutDateChange}
        />
      )}

      {/* Room Selector */}
      <Text style={styles.label}>Rooms</Text>
      <View style={styles.counterContainer}>
        <Button title="-" onPress={() => setRooms(Math.max(1, rooms - 1))} />
        <Text style={styles.counterText}>{rooms}</Text>
        <Button title="+" onPress={() => setRooms(rooms + 1)} />
      </View>

      {/* Adults Selector */}
      <Text style={styles.label}>Adults</Text>
      <View style={styles.counterContainer}>
        <Button title="-" onPress={() => setAdults(Math.max(1, adults - 1))} />
        <Text style={styles.counterText}>{adults}</Text>
        <Button title="+" onPress={() => setAdults(adults + 1)} />
      </View>

      {/* Search Button */}
      <Button title="Search Hotels" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA', // Soft, modern background color
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dateText: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 15,
    textAlign: 'center',
    color: '#007BFF',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', // Better alignment
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default SearchHotelsScreen;
