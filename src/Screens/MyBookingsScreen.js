import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

const bookingOptions = [
  {
    id: '1',
    title: 'My Appointment Bookings',
    icon: <MaterialIcons name="medical-services" size={30} color="#007BFF" />,
    route: 'MyAppointmentsBookings',
  },
  {
    id: '2',
    title: 'My Flight Bookings',
    icon: <FontAwesome5 name="plane" size={30} color="#007BFF" />,
    route: 'MyFlightBookings',
  },
  {
    id: '3',
    title: 'My Hotel Bookings',
    icon: <Ionicons name="bed-outline" size={30} color="#007BFF" />,
    route: 'MyHotelBookings',
  },
];

export default function MyBookingsScreen() {
  const navigation = useNavigation();

  const renderBookingOption = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.route)}
    >
      <View style={styles.iconContainer}>{item.icon}</View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <FlatList
        data={bookingOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingOption}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingVertical: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#E0F7FA',
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
