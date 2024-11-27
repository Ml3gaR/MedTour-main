import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HotelCard = ({ hotel, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: hotel.photoMainUrl }} style={styles.image} />
      <Text style={styles.name}>{hotel.name}</Text>
      <Text style={styles.price}>Price: {Math.round(hotel.priceBreakdown?.grossPrice?.value)} SAR/night</Text>
      <Text style={styles.rating}>Rating: {hotel.reviewScore || 'N/A'} ({hotel.reviewScoreWord || ''})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
});

export default HotelCard;
