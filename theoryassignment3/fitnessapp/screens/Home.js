import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FitBuddy</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/706/706830.png' }}
        style={styles.img}
      />

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.btnText}>My Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: '#4E9F3D' }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.btnText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  img: { width: 120, height: 120, marginBottom: 30 },
  btn: {
    backgroundColor: '#0078AA',
    padding: 12,
    borderRadius: 7,
    width: '80%',
    alignItems: 'center',
    marginVertical: 5
  },
  btnText: { color: 'white', fontSize: 18 }
});
