import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem('user');
    setUser(JSON.parse(data));
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/706/706830.png' }}
        style={styles.img}
      />

      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  img: { width: 120, height: 120, borderRadius: 60 },
  title: { fontSize: 26, marginTop: 20 },
  email: { fontSize: 18, color: '#555' }
});
