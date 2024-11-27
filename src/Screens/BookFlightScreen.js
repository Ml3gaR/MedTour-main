import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { items as airportList } from '../config/AirportListFile'; // Static airport list

export default function BookFlightScreen() {
  const [from, setFrom] = useState(''); // Departure airport state
  const [to, setTo] = useState(''); // Destination airport state
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering airports
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [isFromModalVisible, setFromModalVisible] = useState(false); // 'From' airport modal visibility
  const [isToModalVisible, setToModalVisible] = useState(false); // 'To' airport modal visibility

  const navigation = useNavigation(); // Hook to enable navigation

  // Populate airports initially from static list or API
  useEffect(() => {
    setFilteredAirports(airportList);
  }, []);

  // Handle airport filtering based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = airportList.filter((airport) =>
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAirports(filtered);
    } else {
      setFilteredAirports(airportList); // Reset to full list if search query is empty
    }
  };

  // Handle selecting the airport from the filtered list
  const selectFromAirport = (airportCode) => {
    setFrom(airportCode); // Set selected departure airport
    setFromModalVisible(false); // Hide modal
  };

  const selectToAirport = (airportCode) => {
    setTo(airportCode); // Set selected destination airport
    setToModalVisible(false); // Hide modal
  };

  const onDepartureDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || departureDate;
    setShowDeparturePicker(false);
    setDepartureDate(currentDate);
  };

  // Renders each airport in the modal list
  const renderAirportItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectFromAirport(item.code)} style={styles.listItem}>
      <Text>{item.city} ({item.code})</Text>
    </TouchableOpacity>
  );

  // Navigate to FlightsListScreen on Search button press
  const handleSearchPress = () => {
    if (from && to) {
      navigation.navigate('FlightsListScreen', {
        from,
        to,
        departureDate: departureDate.toISOString().split('T')[0], // Ensure correct format
      });
    } else {
      alert('Please select both departure and destination airports.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Flight</Text>
      <View style={styles.inputContainer}>
        {/* From Airport Selector */}
        <TouchableOpacity onPress={() => setFromModalVisible(true)} style={styles.inputRow}>
          <Icon name="plane" size={20} color="#007BFF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Select Departure Airport"
            value={from ? `${airportList.find(a => a.code === from)?.city} (${from})` : ''}
            editable={false}
          />
        </TouchableOpacity>

        {/* Modal for From Airport Selection */}
        <Modal visible={isFromModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search airports"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredAirports}
              renderItem={renderAirportItem}
              keyExtractor={(item) => item.code}
            />
            <Button onPress={() => setFromModalVisible(false)}>Close</Button>
          </View>
        </Modal>

        {/* To Airport Selector */}
        <TouchableOpacity onPress={() => setToModalVisible(true)} style={styles.inputRow}>
          <Icon name="plane" size={20} color="#007BFF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Select Destination Airport"
            value={to ? `${airportList.find(a => a.code === to)?.city} (${to})` : ''}
            editable={false}
          />
        </TouchableOpacity>

        {/* Modal for To Airport Selection */}
        <Modal visible={isToModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search airports"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredAirports}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectToAirport(item.code)} style={styles.listItem}>
                  <Text>{item.city} ({item.code})</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.code}
            />
            <Button onPress={() => setToModalVisible(false)}>Close</Button>
          </View>
        </Modal>

        {/* Departure Date Picker */}
        <View style={styles.inputRowContainer}>
          <TouchableOpacity onPress={() => setShowDeparturePicker(true)} style={styles.inputRowHalf}>
            <View style={styles.inputRow}>
              <Icon name="calendar" size={20} color="#007BFF" style={styles.inputIcon} />
              <TextInput
                value={departureDate.toDateString()}
                style={styles.inputHalf}
                editable={false}
              />
            </View>
          </TouchableOpacity>
          {showDeparturePicker && (
            <DateTimePicker
              value={departureDate}
              mode="date"
              display="default"
              onChange={onDepartureDateChange}
            />
          )}
        </View>

        {/* Search Button */}
        <Button mode="contained" style={styles.searchButton} onPress={handleSearchPress}>
          SEARCH
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 20,
  },
  inputContainer: {
    paddingBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputRowHalf: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007BFF',
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  searchBar: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

