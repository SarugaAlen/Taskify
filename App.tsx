import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import {TaskProvider} from './TaskContext';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Taskify'}}
            />
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{title: 'Vaša opravila'}}
            />
            <Stack.Screen
              name="TaskDetails"
              component={TaskDetailsScreen}
              options={{title: 'Podrobnosti'}}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{title: 'Novo opravilo'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
      </GestureHandlerRootView>
  );
}

export default App;
