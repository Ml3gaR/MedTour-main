import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MyHotelBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const querySnapshot = await getDocs(collection(db, 'hotelBookings'));
    const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookings(bookingsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007BFF" />;

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.bookingCard}>
          <Text>Hotel: {item.hotelName}</Text>
          <Text>Check-in: {item.checkInDate}</Text>
          <Text>Check-out: {item.checkOutDate}</Text>
          <Text>Price: {item.price} SAR</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  bookingCard: { padding: 20, margin: 10, backgroundColor: '#f9f9f9', borderRadius: 10 },
});

export default MyHotelBookings;
