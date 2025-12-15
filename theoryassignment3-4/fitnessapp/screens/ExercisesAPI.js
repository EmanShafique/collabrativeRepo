import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function ExercisesAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExercises = async () => {
    try {
      const response = await fetch(
        'https://exercisedb.p.rapidapi.com/exercises?limit=10',
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '3550e67508msh73068b43991896ap14e5cbjsne62a748b3f9',   // <-- Replace with your API key
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        }
      );
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchExercises(); }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0078AA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Exercises</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.gifUrl }} style={styles.img} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>Muscle: {item.target}</Text>
            <Text style={styles.text}>Equipment: {item.equipment}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 15 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  card: { backgroundColor: '#E8F9FD', padding: 10, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  img: { width: 120, height: 120, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  text: { fontSize: 14 }
});
