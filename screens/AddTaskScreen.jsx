import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskContext } from '../TaskContext'; 


const AddTaskScreen = ({navigation}) => {
  const { addTask } = useContext(TaskContext);
  const categories = [
    'Služba',
    'Osebno',
    'Nakup',
    'Zdravje',
    'Izobrazba',
    'Razno',
  ];

    const [task, setTask] = useState({
      title: '',
      description: '',
      category: 'Personal',
      dueDate: new Date(),
      reminderDate: new Date(),
      status: 'pending',
    });

  const [errors, setErrors] = useState({});
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!task.title.trim()) {
      newErrors.title = 'Ime opravila je obvezno';
      isValid = false;
    }

    if (!task.description.trim()) {
      newErrors.description = 'Opis opravila je obvezen';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newTask = {
        id: Date.now().toString(),
        title: task.title,
        description: task.description,
        category: task.category,
        dueDate: task.dueDate,
        reminderDate: task.reminderDate,
        status: 'pending',
      };
      addTask(newTask);
      Alert.alert('Opravilo dodano', 'Vaše opravilo je bilo uspešno dodano.', [
        { text: 'V redu', onPress: () => navigation.navigate('TaskList') },
      ]);
    }
  };

  const formatDate = date => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };


  const onDueDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || task.dueDate;
      setTask({ ...task, dueDate: currentDate });
    }
  
    setShowDueDatePicker(false);
  };
  
  const onReminderDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || task.reminderDate;
      setTask({ ...task, reminderDate: currentDate });
    }
  
    setShowReminderDatePicker(false);
  };
 

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Dodaj novo opravilo</Text>

          <Text style={styles.label}>Ime opravila</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Vnesite ime opravila"
            value={task.title}
            onChangeText={text => {
              setTask({...task, title: text});
              if (errors.title) {
                setErrors({...errors, title: null});
              }
            }}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

          <Text style={styles.label}>Opis opravila</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description && styles.inputError,
            ]}
            placeholder="Vnesite opis opravila"
            value={task.description}
            onChangeText={text => {
              setTask({...task, description: text});
              if (errors.description) {
                setErrors({...errors, description: null});
              }
            }}
            multiline
            numberOfLines={4}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          <Text style={styles.label}>Kategorija</Text>
          <View style={styles.categoryContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryOption,
                  task.category === category && styles.selectedCategory,
                ]}
                onPress={() => setTask({...task, category: category})}>
                <Text
                  style={[
                    styles.categoryText,
                    task.category === category && styles.selectedCategoryText,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Rok opravila</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDueDatePicker(true)}>
            <Text style={styles.dateButtonText}>
              {formatDate(task.dueDate)}
            </Text>
          </TouchableOpacity>

          {showDueDatePicker && (
            <DateTimePicker
              value={task.dueDate}
              mode="date"
              display="default"
              onChange={onDueDateChange}
            />
          )}

          <Text style={styles.label}>Datum opomnika</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowReminderDatePicker(true)}>
            <Text style={styles.dateButtonText}>
              {formatDate(task.reminderDate)}
            </Text>
          </TouchableOpacity>

          {showReminderDatePicker && (
            <DateTimePicker
              value={task.reminderDate}
              mode="date"
              display="default"
              onChange={onReminderDateChange}
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Dodaj opravilo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>🏠</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  categoryOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    minWidth: '30%',
  },
  selectedCategory: {
    backgroundColor: '#4a6ea9',
    borderColor: '#4a6ea9',
  },
  categoryText: {
    color: '#555',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonText: {
    color: '#333',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4a6ea9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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

export default AddTaskScreen;
