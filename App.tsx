import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import AuthScreen from './screens/AuthScreen';
import { TaskProvider } from './TaskContext';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user || null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            {user ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="TaskList" component={TaskListScreen} />
                <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
                <Stack.Screen name="AddTask" component={AddTaskScreen} />
              </>
            ) : (
              <Stack.Screen name="Login" component={AuthScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </GestureHandlerRootView>
  );
}

export default App;
