import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

export default function CategoryDetailsScreen({ route }) {
  const { category, records } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category.replace(/([A-Z])/g, ' $1')} Records</Text>
      {records.length > 0 ? (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recordCard}>
              {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.recordImage} />}
              <Text style={styles.recordText}>{item.description || 'No Description'}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noRecordsText}>No records found in this category.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  recordCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  recordImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  recordText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noRecordsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});
