<template>
    <div class="contentNewTask">
        <h1>Add a new Task</h1>
        <div class="input-field">
            <input type="text" placeholder="Add a Task Title" v-model="name">
        </div>
        <label for="">Due date:</label>
        <input id="dueToInput" type="date" v-model="dueDate">
        <div class="input-field">
            <textarea name="" id="" cols="90" rows="10" v-model="description" placeholder="Type a description for your task."></textarea>
        </div>
        <div class="errorMesg" v-if="showErrorMessage">
            <p class="error-text" color="red">{{ errorMessage }}</p>
        </div>
        <div class="input-button">
            <button @click="addTask" class="button">Add Task</button>
        </div>
    </div>

</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"  
const audioAlert = new Audio("../../assets/sounds/alert.mp3") 

const taskStore = useTaskStore();

const emit = defineEmits ([
    "getTasks"
])

// variables para los valors de los inputs
const name = ref('');
const description = ref('');
const dueDate = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = async() => {
    if(name.value.length === 0 || description.value.length === 0){
        // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.
        showErrorMessage.value = true;
        errorMessage.value = 'The task title or description is empty';
        setTimeout(() => {
        showErrorMessage.value = false;
        }, 5000);
    } else {
        // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla 
        // para que funcione con emit y el addTask del store se llame desde Home.vue.
        await useTaskStore().addTask(name.value, description.value, dueDate.value);
        name.value = '';
        description.value = '';
        dueDate.value = '';
        emit("getTasks");
        console.log("New task added.")
        audioAlert.play();
    }
};

</script>

<style>

.errorMesg {
    text-align: center;
    color: red;
}

</style>
  