import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem('user');

    if (!data) {
      alert('No account found. Please sign up.');
      return;
    }

    const user = JSON.parse(data);

    if (email === user.email && password === user.password) {
      navigation.navigate('Home');
    } else {
      alert('Incorrect Email or Password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#0078AA',
    padding: 10,
    borderRadius: 7,
    marginBottom: 10
  },
  btn: {
    backgroundColor: '#0078AA',
    padding: 12,
    borderRadius: 7,
    alignItems: 'center'
  },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  link: { color: '#0078AA', textAlign: 'center', marginTop: 10 }
});
