import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const signIn = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    await auth().signOut();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prijava</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Geslo"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Prijava</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Odjava</Text>
      </TouchableOpacity>

      {user && <Text style={styles.welcomeText}>Dobrodošli, {user.email}!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a6ea9',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default AuthScreen;
