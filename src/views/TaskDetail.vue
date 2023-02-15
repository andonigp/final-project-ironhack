<template>
    <Nav />
    <h1>{{ taskTitle }}</h1>
    <h4>{{ taskCreationDate }}</h4>
    <h4>{{ taskCreationHour }}</h4>
    <h4>{{ taskCreatedBy }}</h4>
    <h4>{{ taskAsignedTo }}</h4>
    <h5>{{ taskStatus }}</h5>
    <p>{{ taskDescription }}</p>
</template>

<script setup>
import Nav from '../components/Nav.vue';
import { useTaskStore } from "../stores/task";
import { useUserStore } from "../stores/user";
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
const taskAsignedTo = ref('')
let taskStatus = ref('')
const taskDescription = ref('')
const getInfo = async() => {
    taskInfo.value = await taskStore.fetchTasksInformation(url)
    console.log(taskInfo.value[0])

    if (taskInfo.value[0].user_id === useUserStore().user.id || taskInfo.value[0].asignedBy === useUserStore().user.email) {

        taskTitle.value = taskInfo.value[0].title  
        taskCreationDate.value = taskInfo.value[0].created_at.split("T")[0]
        taskCreationHour.value = taskInfo.value[0].created_at.split(".")
        taskCreationHour.value = taskCreationHour.value[0].split("T")[1]
        taskCreatedBy.value = taskInfo.value[0].asignedBy
        taskAsignedTo.value = useUserStore().user.email
        if (taskInfo.value[0].is_complete === true ) {
            taskStatus.value = "Complete"
            console.log(taskStatus.value)
        } else {
            taskStatus.value = "Incomplete"
        }
        taskDescription.value = taskInfo.value[0].description 
        
    } else {
        
        taskTitle.value = "You are not allowed to this task's detail. Sorry"

    }

}

getInfo();


onMounted(() => {
    getInfo()
})





</script>

<style scoped>

</style>