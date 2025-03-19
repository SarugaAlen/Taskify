import React, { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCurrentUserId = () => {
    const user = auth().currentUser;
    if (!user) {
      console.log("No user currently signed in");
      return null;
    }
    console.log("Current user ID:", user.uid);
    return user.uid;
  };

  const getTasksRef = () => {
    const userId = getCurrentUserId();
    return userId ? firestore().collection('users').doc(userId).collection('tasks') : null;
  };

  useEffect(() => {
    let unsubscribeFirestore = null;
    
    const unsubscribeAuth = auth().onAuthStateChanged(user => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
        unsubscribeFirestore = null;
      }
      
      if (user) {
        setTimeout(() => {
          unsubscribeFirestore = setupFirestoreListener();
        }, 500);
      } else {
        setTasks([]);
        setLoading(false);
      }
    });
  
    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []);


  const setupFirestoreListener = () => {
    const tasksRef = getTasksRef();
    
    if (!tasksRef) {
      setLoading(false);
      return null;
    }
  
    try {
      return tasksRef.onSnapshot(querySnapshot => {
        const tasksList = [];
        
        querySnapshot.forEach(doc => {
          const data = doc.data();
          
          const task = {
            id: doc.id,
            title: data.title,
            description: data.description,
            category: data.category,
            dueDate: data.dueDate ? data.dueDate.toDate() : null,
            reminderDate: data.reminderDate ? data.reminderDate.toDate() : null,
            status: data.status,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
          
          tasksList.push(task);
        });
        
        setTasks(tasksList);
        setLoading(false);
      }, error => {
        if (auth().currentUser) {
          console.error("Error fetching tasks: ", error);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error("Error setting up tasks listener: ", error);
      setLoading(false);
      return null;
    }
  };

  const addTask = async (newTask) => {
    const tasksRef = getTasksRef();
    
    if (!tasksRef) return;
    
    try {
      const taskToAdd = {
        ...newTask,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      
      if (taskToAdd.id) {
        delete taskToAdd.id;
      }
      
      await tasksRef.add(taskToAdd);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const toggleTaskStatus = async (id) => {
    const tasksRef = getTasksRef();
    
    if (!tasksRef) return;
    
    try {
      const taskDoc = await tasksRef.doc(id).get();
      if (taskDoc.exists) {
        const currentStatus = taskDoc.data().status;
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        
        await tasksRef.doc(id).update({
          status: newStatus,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error toggling task status: ", error);
    }
  };

  const deleteTask = async (id) => {
    const tasksRef = getTasksRef();
    
    if (!tasksRef) return;
    
    try {
      await tasksRef.doc(id).delete();
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const updateTask = async (id, updatedData) => {
    const tasksRef = getTasksRef();
    
    if (!tasksRef) return;
    
    try {
      await tasksRef.doc(id).update({
        ...updatedData,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      toggleTaskStatus, 
      deleteTask, 
      updateTask,
      loading 
    }}>
      {children}
    </TaskContext.Provider>
  );
};