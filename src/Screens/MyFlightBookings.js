import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MyFlightBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch flight bookings from Firebase
  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
    } catch (error) {
      console.error('Error fetching flight bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 50 }} />;

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.bookingCard}>
          {/* Displaying only the first 5 characters of the flightId */}
          <Text style={styles.flightId}>Flight ID: {item.flightId?.substring(0, 5) || 'N/A'}</Text>
          <Text style={styles.detail}>From: {item.origin} → To: {item.destination}</Text>
          <Text style={styles.detail}>Carrier: {item.carrier || 'N/A'}</Text>
          <Text style={styles.detail}>Price: {item.price} SAR</Text>
          <Text style={styles.detail}>Departure: {item.departure || 'N/A'}</Text>
          <Text style={styles.detail}>Arrival: {item.arrival || 'N/A'}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.noBookingsText}>No flight bookings found.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  bookingCard: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  flightId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007BFF',
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  noBookingsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default MyFlightBookings;
