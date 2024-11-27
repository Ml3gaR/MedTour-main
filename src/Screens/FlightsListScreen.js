import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import FlightCard from '../components/cards/FlightCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function FlightsListScreen({ route }) {
  const { from, to, departureDate } = route.params;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchFlights = async () => {
    try {
      const formattedDate = departureDate;
      const options = {
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/search-one-way',
        params: {
          fromEntityId: from,
          toEntityId: to,
          departDate: formattedDate,
        },
        headers: {
          'x-rapidapi-key': 'ec1bab343dmshc0d2b5ad5ff2e1fp10256bjsn0c25ef7effad',
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      if (response.data && response.data.data && response.data.data.itineraries.length > 0) {
        const flightData = response.data.data.itineraries.map(itinerary => {
          const leg = itinerary.legs[0];
          return {
            id: itinerary.id,
            price: itinerary.price.formatted,
            departure: leg.departure,
            arrival: leg.arrival,
            origin: leg.origin.displayCode,
            destination: leg.destination.displayCode,
            duration: leg.durationInMinutes,
            carrier: leg.carriers.marketing[0].name,
            carrierLogo: leg.carriers.marketing[0].logoUrl,
          };
        });
        setFlights(flightData);
      } else {
        setFlights([]);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleFlightPress = (flight) => {
    navigation.navigate('FlightBookingDetails', flight);
  };

  const renderFlight = ({ item }) => (
    <TouchableOpacity onPress={() => handleFlightPress(item)}>
      <FlightCard
        id={item.id}
        price={item.price}
        departure={item.departure}
        arrival={item.arrival}
        origin={item.origin}
        destination={item.destination}
        carrier={item.carrier}
        carrierLogo={item.carrierLogo}
        duration={item.duration}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : flights.length === 0 ? (
        <Text>No flights available for the selected route and date.</Text>
      ) : (
        <FlatList
          data={flights}
          renderItem={renderFlight}
          keyExtractor={(item) => item.id}
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
