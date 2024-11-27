import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import HotelCard from '../components/cards/HotelCard';

export default function HotelsListScreen({ route, navigation }) {
  const { destId, checkInDate, checkOutDate } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = async () => {
    try {
      console.log('Fetching hotels for Destination ID:', destId);
      console.log('Check-in date:', checkInDate, 'Check-out date:', checkOutDate);
  
      const response = await axios.get('https://booking-com.p.rapidapi.com/v2/hotels/search', {
        params: {
          dest_id: destId,
          dest_type: 'city',
          locale: 'en-gb',
          order_by: 'bayesian_review_score',
          filter_by_currency: 'SAR',
          units: 'metric',
          checkin_date: checkInDate,
          checkout_date: checkOutDate,
          room_number: 1,
          adults_number: 2,
        },
        headers: {
          'x-rapidapi-key': 'ec1bab343dmshc0d2b5ad5ff2e1fp10256bjsn0c25ef7effad',
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
        },
      });

      console.log('Hotels API Response:', response.data);

      if (response.data && response.data.results && response.data.results.length > 0) {
        setHotels(response.data.results);
      } else {
        Alert.alert('No hotels found!');
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      Alert.alert('Error fetching hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleHotelPress = (hotel) => {
    navigation.navigate('HotelBookingDetails', {
      hotelId: hotel.id,
      checkInDate,
      checkOutDate,
    });
  };
  

  const renderHotel = ({ item }) => (
    <HotelCard hotel={item} onPress={() => handleHotelPress(item)} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : hotels.length === 0 ? (
        <Text>No hotels available for the selected dates.</Text>
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotel}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
