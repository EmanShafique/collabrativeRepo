import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function TasksScreen() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const addTask = () => {
    if (!task) return;
    setList([...list, task]);
    setTask('');
  };

  const deleteTask = (index) => {
    const temp = [...list];
    temp.splice(index, 1);
    setList(temp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fitness Tasks</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new task"
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.btn} onPress={addTask}>
        <Text style={styles.btnText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.task}
            onPress={() => deleteTask(index)}
          >
            <Text style={styles.taskText}>• {item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#0078AA',
    padding: 10,
    borderRadius: 7,
    marginBottom: 10
  },
  btn: {
    backgroundColor: '#0078AA',
    padding: 12,
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: 20
  },
  btnText: { color: 'white', fontSize: 18 },
  task: {
    backgroundColor: '#E8F9FD',
    padding: 10,
    borderRadius: 7,
    marginVertical: 5
  },
  taskText: { fontSize: 18 }
});
