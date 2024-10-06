import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const HospitalDetailsScreen = ({ route }) => {
  const hospital = route?.params?.hospital || {
    name: 'Nordwest Clinic',
    specialty: 'Cardiology',
    rating: 4.7,
    price: 1500,
    image: 'https://example.com/hospital.jpg',
    location: '123 Medical St, Cityville',
    phone: '+123 456 7890',
    email: 'contact@nordwestclinic.com',
    website: 'https://www.nordwestclinic.com',
    facilities: 'Emergency, Surgery, Outpatient',
    workingHours: 'Open 24/7',
    reviews: [
      { user: 'John Doe', rating: 4.5, comment: 'Great service and care!' },
      { user: 'Jane Doe', rating: 5, comment: 'Highly recommend this hospital.' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: hospital.image }} style={styles.image} />
      <Text style={styles.name}>{hospital.name}</Text>
      <Text style={styles.specialty}>Specialty: {hospital.specialty}</Text>
      <Text style={styles.rating}>Rating: ⭐ {hospital.rating}</Text>
      <Text style={styles.price}>Price: ${hospital.price}</Text>
      <Text style={styles.location}>Location: {hospital.location}</Text>
      <Text style={styles.contact}>Contact: {hospital.phone}</Text>
      <Text style={styles.email}>Email: {hospital.email}</Text>
      <Text style={styles.website}>Website: {hospital.website}</Text>
      <Text style={styles.facilities}>Facilities: {hospital.facilities}</Text>
      <Text style={styles.workingHours}>Working Hours: {hospital.workingHours}</Text>
      <Text style={styles.reviewsHeader}>Patient Reviews:</Text>
      {hospital.reviews.map((review, index) => (
        <Text key={index} style={styles.review}>
          {review.user}: {review.rating} - "{review.comment}"
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specialty: {
    fontSize: 18,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  website: {
    fontSize: 16,
    marginBottom: 10,
    color: 'blue',
  },
  facilities: {
    fontSize: 16,
    marginBottom: 10,
  },
  workingHours: {
    fontSize: 16,
    marginBottom: 10,
  },
  reviewsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  review: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HospitalDetailsScreen;
