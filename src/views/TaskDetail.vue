<template>
    <Nav />
    <h1>{{ taskTitle }}</h1>
    <h4>{{ taskCreationDate }}</h4>
    <h4>{{ taskCreationHour }}</h4>
    <h4>{{ taskCreatedBy }}</h4>
</template>

<script setup>
import Nav from '../components/Nav.vue';
import { useTaskStore } from "../stores/task";
import { onMounted, onUpdated, ref } from 'vue';

const taskStore = useTaskStore()

//  ------------------ Get URL Instance -----------------
function getCurrentURL () {
    return window.location.href
  }
  
  // Example
  let url = getCurrentURL().split("/")
  url = url[4]
  console.log(url)

const taskInfo = ref([])
const taskTitle = ref('')
const taskCreationDate = ref('')
const taskCreationHour = ref('')
const taskCreatedBy = ref('')
const getInfo = async() => {
    taskInfo.value = await taskStore.fetchTasksInformation(url)
    console.log(taskInfo.value[0])
    taskTitle.value = taskInfo.value[0].title  
    taskCreationDate.value = taskInfo.value[0].created_at.split("T")[0]
    taskCreationHour.value = taskInfo.value[0].created_at.split(".")
    taskCreationHour.value = taskCreationHour.value[0].split("T")[1]
    taskCreatedBy.value = taskInfo.value[0].asignedBy
}

getInfo();


onMounted(() => {
    getInfo()
})





</script>

<style scoped>

</style>