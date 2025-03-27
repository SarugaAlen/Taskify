import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getNotificationsEnabled, setNotificationsEnabled } from '../utils/storage';

const UserSettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const motivationTopic = 'motivation';

  useEffect(() => {
    setIsNotificationsEnabled(getNotificationsEnabled());
  }, []);

  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      if (token) {
        console.log('Token retrieved successfully');
      } else {
        console.log('No token available');
      }
    } catch (error) {
      console.error('Error retrieving FCM token:', error);
    }
  };

  const subscribeToTopic = async () => {
    try {
      await messaging().subscribeToTopic(motivationTopic);
      console.log('Subscribed to motivation topic');
    } catch (error) {
      console.error('Error subscribing to topic:', error);
    }
  };

  const unsubscribeFromTopic = async () => {
    try {
      await messaging().unsubscribeFromTopic(motivationTopic);
      console.log('Unsubscribed from motivation topic');
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
    }
  };

  const toggleNotifications = async () => {
    console.log("Toggle notifications called");
    
    try {
      const newValue = !isNotificationsEnabled;
      
      if (newValue) {
        const permissionGranted = await requestPermission();
        
        if (!permissionGranted) {
          if (Platform.OS === 'ios') {
            Alert.alert(
              'Potrebno dovoljenje', 
              'Omogočite obvestila v nastavitvah iOS naprave.', 
              [{ text: 'OK', onPress: () => console.log('iOS Alert Closed') }]
            );
          } else {
            Alert.alert(
              'Potrebno dovoljenje', 
              'Omogočite obvestila v nastavitvah Android naprave.', 
              [{ text: 'OK', onPress: () => console.log('Android Alert Closed') }]
            );
          }
          
          setIsNotificationsEnabled(false);
          setNotificationsEnabled(false);
          return;
        }
        
        await subscribeToTopic();
        await getFCMToken();
        
        Alert.alert(
          'Obvestila vklopljena', 
          'Prejemali boste obvestila.', 
          [{ text: 'OK', onPress: () => {
            setIsNotificationsEnabled(true);
            setNotificationsEnabled(true);
          }}]
        );
      } else {
        await unsubscribeFromTopic();
        
        Alert.alert(
          'Obvestila izklopljena', 
          'Ne boste prejemali obvestil.', 
          [{ text: 'OK', onPress: () => {
            setIsNotificationsEnabled(false);
            setNotificationsEnabled(false);
          }}]
        );
      }
    } catch (error) {
      console.error('Toggle notifications error:', error);
      
      Alert.alert(
        'Napaka', 
        'Prišlo je do napake pri spreminjanju nastavitev obvestil.', 
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nastavitve</Text>
      <View style={styles.settingRow}>
        <Text>Vklop motivacijskih sporočil</Text>
        <Switch 
          value={isNotificationsEnabled} 
          onValueChange={toggleNotifications} 
          testID="notifications-switch"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserSettingsScreen;