import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      
      <Image 
        source={{ uri: 'https://static-00.iconduck.com/assets.00/todo-icon-512x512-voha1qns.png' }} 
        style={styles.logo}
      />
      
      <Text style={styles.subtitle}>Vaša opravila na enem mestu</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('TaskList')}
        >
          <Text style={styles.buttonText}>Ogled vseh opravil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.addButton]} 
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.buttonText}>Dodaj novo opravilo</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4a6ea9',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#9368B7',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;