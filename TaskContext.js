import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      title: 'Dokončaj poročilo', 
      description: 'Dokončati je treba poročilo za projekt.', 
      category: 'Delo', 
      dueDate: new Date(), 
      reminderDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: 'pending' 
    },
    { 
      id: '2', 
      title: 'Preberi dokumentacijo', 
      description: 'Prebrati je treba dokumentacijo projekta.', 
      category: 'Delo', 
      dueDate: new Date(), 
      reminderDate: new Date(new Date().setDate(new Date().getDate() + 2)), 
      status: 'completed' 
    },
    { 
      id: '3', 
      title: 'Posodobi spletno stran', 
      description: 'Posodobi vsebino spletne strani.', 
      category: 'Tehnologija', 
      dueDate: new Date(), 
      reminderDate: new Date(new Date().setDate(new Date().getDate() + 3)), 
      status: 'pending' 
    },
  ]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    console.log("Deleting task with id:", id);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      console.log("Updated tasks:", updatedTasks);
      return updatedTasks;
    });
  };


  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
