import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// Welcome screen component receives the navigation prop
export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* App Title */}
      <Text style={styles.title}>🏋️ FitBuddy</Text>

      {/* App Icon */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' }}
        style={{ width: 150, height: 150, marginBottom: 20 }}
      />

      {/* Subtitle */}
      <Text style={styles.subtitle}>Your Personal Fitness Partner</Text>

      {/* Login Button - navigates to Login screen */}
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Button - navigates to Signup screen */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#4E9F3D' }]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container styling
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },

  // Main title styling
  title: { fontSize: 40, fontWeight: 'bold', color: '#0078AA' },

  // Subtitle text styling
  subtitle: { fontSize: 18, color: '#333', marginBottom: 25 },
  // Button styling
  btn: {
    width: '80%',
    backgroundColor: '#0078AA',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center'
  },
  // Button text styling
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});