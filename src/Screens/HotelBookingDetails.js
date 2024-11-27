import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, FlatList, Alert, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
//import { db } from '../../firebase';
import { db, auth } from '../firebase';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const HotelBookingDetails = ({ route, navigation }) => {
  const { hotelId, checkInDate, checkOutDate } = route.params;
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch hotel details from the API
  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get('https://booking-com.p.rapidapi.com/v2/hotels/details', {
        params: {
          locale: 'en-gb',
          checkin_date: checkInDate,
          checkout_date: checkOutDate,
          hotel_id: hotelId,
          currency: 'SAR',
        },
        headers: {
          'x-rapidapi-key': 'ec1bab343dmshc0d2b5ad5ff2e1fp10256bjsn0c25ef7effad',
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
        },
      });

      if (response.data) {
        setHotelDetails(response.data);
      } else {
        Alert.alert('No details found for this hotel');
      }
    } catch (error) {
      Alert.alert('Error fetching hotel details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1 }} />;
  }

  if (!hotelDetails) {
    return <Text>No details available for this hotel.</Text>;
  }

  const {
    hotel_name,
    breakfast_review_score,
    property_highlight_strip,
    rooms,
    block,
    description,
  } = hotelDetails;

  const rating = breakfast_review_score?.review_score;
  const price = Math.round(block[0]?.product_price_breakdown?.gross_amount?.value);
  const highlights = property_highlight_strip;
  const roomImages = rooms[Object.keys(rooms)[0]]?.photos;
  const roomDescription = rooms[Object.keys(rooms)[0]]?.description;
  const cancellationPolicy = block[0]?.paymentterms?.cancellation?.description;

  // Function to handle hotel booking
  const handleBookHotel = async () => {
    try {
      await addDoc(collection(db, 'hotelBookings'), {
        hotelName: hotel_name,
        hotelId,
        checkInDate,
        checkOutDate,
        price,
        bookingDate: serverTimestamp(),
      });
      Alert.alert('Success', 'Hotel booked successfully!');
      navigation.navigate('HotelBookingConfirmation');
    } catch (error) {
      Alert.alert('Error', 'Failed to book hotel');
    }
  };
  const bookingOptions = block || [];
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Image Carousel */}
        {roomImages && (
          <FlatList
            horizontal
            data={roomImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item.url_original }} style={styles.carouselImage} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
  
        {/* Hotel Name and Rating */}
        <View style={styles.header}>
          <Text style={styles.hotelName}>{hotel_name}</Text>
          <Text style={styles.rating}>⭐ {rating || 'N/A'}</Text>
        </View>
  
        {/* Price */}
        <Text style={styles.price}>{price ? `SAR ${price}/night` : 'Price not available'}</Text>
  
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{roomDescription || description || 'No description available.'}</Text>
        </View>
  
        {/* Facilities & Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesContainer}>
            {highlights?.map((item, index) => (
              <View key={index} style={styles.facility}>
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
  
        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation Policy</Text>
          <Text>{cancellationPolicy || 'No cancellation policy available.'}</Text>
        </View>
  
        {/* Availability and Booking Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability & Booking Options</Text>
          {bookingOptions.length > 0 ? (
            bookingOptions.map((room, index) => (
              <View key={index} style={styles.roomCard}>
                <Text style={styles.roomType}>{room.name_without_policy}</Text>
                <Text>Max Occupancy: {room.max_occupancy}</Text>
                {room.bed_configurations?.map((config, i) => (
                  <Text key={i}>Bed: {config.bed_types?.map(bed => bed.name_with_count).join(', ')}</Text>
                ))}
                <Text>Meal Plan: {room.mealplan || 'N/A'}</Text>
                <Text style={styles.roomPrice}>
                  Price: {room.product_price_breakdown?.gross_amount?.amount_rounded || 'N/A'} SAR
                </Text>
                <Text>{room.paymentterms?.cancellation?.description || 'No cancellation policy available.'}</Text>
              </View>
            ))
          ) : (
            <Text>No booking options available.</Text>
          )}
        </View>
  
        {/* Spacing for Button */}
        <View style={{ height: 100 }} />
      </ScrollView>
  
      {/* Book Hotel Button (Fixed at the bottom) */}
      <View style={styles.bookButtonContainer}>
        <TouchableOpacity onPress={handleBookHotel} style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Hotel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    carouselImage: { width: 300, height: 200, borderRadius: 10, margin: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
    hotelName: { fontSize: 24, fontWeight: 'bold' },
    rating: { fontSize: 18, color: '#555' },
    price: { fontSize: 18, color: '#007BFF', textAlign: 'center', marginVertical: 10 },
    section: { marginHorizontal: 20, marginVertical: 10 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    description: { fontSize: 16, color: '#555' },
    facilitiesContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    facility: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 10, margin: 5 },
    roomCard: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 15 },
    roomType: { fontSize: 18, fontWeight: 'bold' },
    roomPrice: { fontSize: 16, color: '#007BFF', marginTop: 5 },
  
    // Book Button Styles
    bookButtonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    bookButton: {
      backgroundColor: '#007BFF',
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 40,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    bookButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  

export default HotelBookingDetails;