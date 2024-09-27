<script setup lang="ts">

import {ref, watch} from "vue";

const tasks = ref(JSON.parse(localStorage.getItem('task')) || [])
const newTask = ref('')
const editingIndex = ref(null)
const editedTask = ref('')

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({ text: newTask.value, completed: false });
    newTask.value = '';
  }
};

const editTask = (index) => {
  editingIndex.value = index;
  editedTask.value = tasks.value[index].text;
};

const updateTask = () => {
  if (editingIndex.value !== null && editedTask.value.trim()) {
    tasks.value[editingIndex.value].text = editedTask.value;
    editingIndex.value = null;
    editedTask.value = '';
  }
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

watch(tasks, saveTasks)
</script>

<template>
  <div class="container">
    <h1>To-Do List</h1>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Введите задачу..." />
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" v-model="task.completed" />
        <span @click="editTask(index)"
              :class="{ completed: task.completed }">
          {{ task.text }}
        </span>
        <button @click.stop="removeTask(index)">Удалить</button>
      </li>
    </ul>
    <div v-if="editingIndex !== null">
      <input v-model="editedTask" @keyup.enter="updateTask" placeholder="Редактировать задачу..." />
      <button @click="updateTask">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 700px;
  margin: auto;
}

input {
  padding: 10px;
}

button {
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>