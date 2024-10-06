import React, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import HospitalCard1 from '../components/cards/HospitalCard1';  // Import the HospitalCard1 component

const HospitalListScreen = () => {
  // Mock hospital data (replace this with actual data later)
  const mockHospitals = [
    {
      id: 1,
      name: "Nordwest Clinic",
      specialty: "Cardiology",
      rating: 4.7,
      distance: "2000m",
      price: 1575,
      image: "https://example.com/hospital1.jpg"
    },
    {
      id: 2,
      name: "St. Katharinen Hospital",
      specialty: "Cardiology",
      rating: 5.0,
      distance: "1000m",
      price: 1400,
      image: "https://example.com/hospital2.jpg"
    },
    {
        id: 3,
        name: "KSU ",
        specialty: "Cardiology",
        rating: 5.0,
        distance: "1000m",
        price: 1400,
        image: "https://example.com/hospital2.jpg"
      },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Search bar to filter hospitals */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search doctor, clinics..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* FlatList to render the hospital cards */}
      <FlatList
        data={mockHospitals.filter(hospital =>
          hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )}  // Filter hospitals based on search query
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <HospitalCard1 hospital={item} />}  // Use the HospitalCard1 component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  searchBar: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
});

export default HospitalListScreen;
