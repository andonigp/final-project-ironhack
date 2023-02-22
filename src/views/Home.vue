<template>
  <div class="wrapper">
    <Nav />

    <div class="contentHome">
      <div class="headerReorder">
        <NewTask @getTasks="getTasks" />
        <Graph
          :incompleteTasks="getIncomplete"
          :completedTasks="getComplete"
          @getTasks="getTasks"
        />
      </div>
    </div>
    <h1 class="homeTaskTitle">Assigned tasks:</h1>
    <div class="orderTaskBy">
      <select class="orderTaskByDD" v-model="orderFlow">
        <option value="" disabled selected hidden>A -> Z / Z -> A</option>
        <option :value="true">Ascending</option>
        <option :value="false">Descending</option>
      </select>
      <select class="orderTaskByDD" v-model="orderTask">
        <option value="" disabled selected hidden>Order tasks by:</option>
        <option value="id">Creation</option>
        <option value="asignedBy">Created by</option>
        <option value="is_complete">Status</option>
        <option value="due">Due date</option>
        <option value="title">Title</option>
      </select>
    </div>
    <div class="taskWrapper">
      <TaskItem
        class="taskContainer"
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @getTasks="getTasks"
      />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import Footer from "../components/Footer.vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
import Graph from "../components/GraphComponent.vue";

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);
const getIncomplete = ref([]);
const getComplete = ref([]);

const orderTask = ref("id");
const orderFlow = ref(false);

// Creamos una función que conecte a la store para conseguir las tareas de supabase

const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks(orderTask.value, orderFlow.value);
  // console.log("GET TASKS");
  getIncomplete.value = tasks.value.filter((task) => !task.is_complete);
  getComplete.value = tasks.value.filter((task) => task.is_complete);
};

getTasks();
</script>



<style>
</style>
