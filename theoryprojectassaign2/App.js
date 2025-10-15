import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function App() {
  const [page, setPage] = useState('welcome');

  // Signup info
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Login info
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // User data
  const [currentUser, setCurrentUser] = useState(null);

  // Tasks and reminders
  const exercises = ['20 Push Ups', '15 Squats', '10 Minute Walk', 'Plank for 30 sec'];
  const reminders = ['💧 Drink 8 glasses of water', '🥗 Eat balanced meals', '🕒 Sleep at least 7 hours', '🚶 Walk 5,000 steps'];

  // SIGNUP 
  const handleSignup = () => {
    if (signupName && signupEmail && signupPassword) {
      alert('Account Created Successfully!');
      setCurrentUser({ name: signupName, email: signupEmail, password: signupPassword });
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setPage('login');
    } else {
      alert('Please fill all fields!');
    }
  };

  // LOGIN 
  const handleLogin = () => {
    if (!currentUser) {
      alert('Please sign up first!');
      setPage('signup');
    } else if (loginEmail === currentUser.email && loginPassword === currentUser.password) {
      alert('Welcome back, ' + currentUser.name + '!');
      setPage('home');
    } else {
      alert('Incorrect email or password!');
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setLoginEmail('');
    setLoginPassword('');
    setPage('welcome');
  };

  //  WELCOME PAGE 
  if (page === 'welcome') {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>🏋️‍♀️ FitZone</Text>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' }}
          style={{ width: 150, height: 150, marginBottom: 30 }}
        />
        <Text style={styles.subtitle}>Your Personalized Fitness Partner</Text>

        <TouchableOpacity style={styles.btn} onPress={() => setPage('login')}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#4E9F3D' }]}
          onPress={() => setPage('signup')}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  SIGNUP PAGE 
  if (page === 'signup') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Account</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={signupName}
          onChangeText={setSignupName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={signupEmail}
          onChangeText={setSignupEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={signupPassword}
          onChangeText={setSignupPassword}
        />

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#4E9F3D' }]}
          onPress={handleSignup}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage('login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  LOGIN PAGE 
  if (page === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login to FitZone</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={loginEmail}
          onChangeText={setLoginEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={loginPassword}
          onChangeText={setLoginPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage('signup')}>
          <Text style={styles.link}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  HOME PAGE 
  if (page === 'home') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome, {currentUser?.name} 👋</Text>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/706/706830.png' }}
          style={styles.profilePic}
        />
        <Text style={styles.subtitle}>Email: {currentUser?.email}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏋️ Pending Exercises</Text>
          {exercises.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Daily Reminders</Text>
          {reminders.map((item, index) => (
            <Text key={index} style={styles.listItem}>{item}</Text>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#D61355', marginTop: 30 }]}
          onPress={handleLogout}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

//  STYLES 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F9FD',
    padding: 20,
  },
  appTitle: { fontSize: 34, fontWeight: 'bold', color: '#0078AA', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 15 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0078AA', marginBottom: 20, textAlign: 'center' },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#0078AA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#0078AA',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 6,
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#0078AA', marginTop: 10 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginVertical: 20 },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0078AA', marginBottom: 10 },
  listItem: { fontSize: 16, color: '#333', marginVertical: 3 },
});

