import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

import { TaskContext } from '../TaskContext'; 


const TaskListScreen = ({ navigation }) => {
  const { tasks, toggleTaskStatus } = useContext(TaskContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDueDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, item.status === 'completed' && styles.completedTask]}
      onPress={() => navigation.navigate('TaskDetails', { task: item })}
    >
      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, item.status === 'completed' && styles.completedTaskText]}>
          {item.title}
        </Text>
        <Text style={styles.dueDate}>
          Rok: {formatDueDate(item.dueDate)}
        </Text>
        <Text style={styles.taskStatus}>
          Status: {item.status === 'completed' ? 'Končano' : 'V Teku'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.statusButton, item.status === 'completed' ? styles.pendingButton : styles.completeButton]}
        onPress={() => toggleTaskStatus(item.id)}
      >
        <Text style={styles.statusButtonText}>
          {item.status === 'completed' ? 'V Teku' : 'Končano'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Išči opravila..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Ni najdenih opravil</Text>}
      />

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>🏠</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 100,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  completedTask: {
    backgroundColor: '#f9f9f9',
    borderLeftColor: '#4CAF50',
    borderLeftWidth: 5,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskStatus: {
    fontSize: 14,
    color: '#666',
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  pendingButton: {
    backgroundColor: '#FF9800',
  },
  statusButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  dueDate: {
    fontSize: 14,
    color: '#555',
  },
  homeButton: {
    position: 'absolute',
    bottom: 30, 
    left: 20,
    backgroundColor: '#4a6ea9', 
    width: 55, 
    height: 55, 
    borderRadius: 35, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    shadowOffset: { width: 0, height: 3 }, 
    elevation: 5, 
    padding: 10, 
  },
  homeButtonText: {
    color: 'white',
    fontSize: 28, 
    fontWeight: 'bold',
  },
});

export default TaskListScreen;
