import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';  // Make sure to install react-native-paper for Card component

const HospitalCard1 = ({ hospital }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        {/* Image for hospital */}
        <Image source={{ uri: hospital.image }} style={styles.image} />

        {/* Hospital details */}
        <View style={styles.infoContainer}>
          {/* Hospital name */}
          <Text style={styles.hospitalName}>{hospital.name}</Text>

          {/* Hospital specialty */}
          <Text style={styles.specialty}>{hospital.specialty}</Text>

          {/* Distance from airport */}
          <Text style={styles.distance}>{hospital.distance} from airport</Text>

          {/* Row for rating and price */}
          <View style={styles.row}>
            {/* Hospital rating */}
            <Text style={styles.rating}>⭐ {hospital.rating}</Text>

            {/* Hospital price */}
            <Text style={styles.price}>${hospital.price}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

// Styles for the card component
const styles = StyleSheet.create({
  card: {
    marginVertical: 8,    // Space between cards
    borderRadius: 10,     // Rounded corners
    elevation: 3,         // Shadow for the card (Android)
    backgroundColor: '#fff',
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',  // Image and details side-by-side
    alignItems: 'center',
  },
  image: {
    width: 80,             // Image width
    height: 80,            // Image height
    borderRadius: 8,       // Rounded image
    marginRight: 15,       // Space between image and text
  },
  infoContainer: {
    flex: 1,               // Take remaining space for details
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 14,
    color: '#6e6e6e',
  },
  distance: {
    fontSize: 12,
    color: '#999',
  },
  row: {
    flexDirection: 'row',   // Rating and price side-by-side
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',     // Yellow-ish color for star rating
  },
  price: {
    fontSize: 14,
    color: '#3498db',     // Blue color for price
    fontWeight: 'bold',
  },
});

export default HospitalCard1;
