import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';

import { TaskContext } from '../TaskContext'; 

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const { deleteTask } = useContext(TaskContext);

  const handleDelete = () => {
    console.log("Attempting to delete task with id:", task.id);
    
    let isMounted = true;
  
    Alert.alert(
      "Izbriši opravilo",
      "Ali ste prepričani, da želite izbrisati to opravilo?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Izbriši", 
          style: "destructive", 
          onPress: () => {
            deleteTask(task.id);
  
            Alert.alert(
              "Opravilo izbrisano", 
              "Vaše opravilo je bilo uspešno izbrisano.",
              [{ 
                text: "OK", 
                onPress: () => {
                  if (isMounted) {
                    navigation.navigate('TaskList');
                  }
                } 
              }] 
            );
          } 
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={[styles.statusBadge, task.status === 'completed' ? styles.completedBadge : styles.pendingBadge]}>
            <Text style={styles.statusText}>
              {task.status === 'completed' ? 'Zaključeno' : 'V obravnavi'}
            </Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Podrobnosti</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        <Text style={styles.sectionTitle}>Kategorija</Text>
        <Text style={styles.description}>{task.category}</Text>

        <Text style={styles.sectionTitle}>Rok opravila</Text>
        <Text style={styles.description}>{task.dueDate.toLocaleDateString()}</Text>

        <Text style={styles.sectionTitle}>Datum opomnika</Text>
        <Text style={styles.description}>{task.reminderDate.toLocaleDateString()}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]} 
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Izbriši</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
  },
  pendingBadge: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaskDetailsScreen;
