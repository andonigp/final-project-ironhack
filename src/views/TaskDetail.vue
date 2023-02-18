<template>
    <Nav />
    <div class="taskCardDesc" v-if="allowed === true">
        <div class="taskTitle">
            <h1>{{ taskTitle }}</h1>
        </div>
        <div class="taskIdentifier">
            <div class="taskPart">
                <img id="cardImgDesc" :src="avatar_created_Img ? avatar_created_Img : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
                <h6>Task created by:</h6>
                <h4>{{ taskCreatedBy }}</h4>
            </div>
            <div class="taskPart">
                <img id="cardImgDesc" :src="avatar_responsable_Img ? avatar_responsable_Img : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
                <h6>Task responsable:</h6>
                <h4>{{ taskAsignedTo }}</h4>
            </div>
        </div>
        <hr>
        <div class="taskChars">
            <h4>{{ taskCreationDate }}</h4>
            <h4>{{ taskCreationHour }}</h4>
            <h4>{{ taskStatus }}</h4>
        </div>
        <hr>
        <p class="taskDesc">{{ taskDescription }}</p>
        <div class="taskIconDesc">
            <i class="fas fa-toggle-off"></i>
            <i class="fas fa-toggle-on"></i>
            <i class="fas fa-trash-alt"></i>
            <i class="fas fa-edit"></i>
        </div>
    </div>
    <div class="taskCardDesc" v-if="allowed === false">
        <i class="fas fa-exclamation-triangle"></i>
        <h1 class="taskTitle">{{ taskTitle }}</h1>
    </div>

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


const allowed = ref(true)
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
        allowed.value = false

    }

}

const avatar_created_Img = ref('')
const avatar_responsable_Img = ref('')

// console.log(taskCreatedBy.value)

// const getImages = async() => {
//     avatar_created_Img.value = await taskStore.asignedByImg(taskCreatedBy)
//     avatar_created_Img.value = avatar_created_Img.value[0].avatar_url
// }


getInfo();
// getImages();



onMounted(() => {
    getInfo()
    // getImages()
})





</script>

<style scoped>
.fa-exclamation-triangle {
    font-size: 100px;
}


.taskCardDesc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 520px;
    margin: auto;
    background: white;
    border-radius: 1rem;
    padding: 5%;
    box-shadow: 0px 6px 8px 0px #88888898;
}

.taskCardDesc h4 {
    font-size: .8rem;
}

.taskTitle {
    margin-top: 10px;
    margin-bottom: 50px;
    text-align: center;
}

.taskPart {
    width: 100%;
}

hr {
    width: 100%;
}

.taskDesc {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: justify;
    /* width: 520px;
    max-width: 520px; */
}

.taskIdentifier {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    text-align: center;
    gap: 60px;
}

.taskChars{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    text-align: center;
    max-width: 520px;
    gap: 70px;
}

#cardImgDesc {
    height: 80px;
    width: 80px;
    max-height: 70%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0px 6px 8px 0px #88888898;
    border: 1px solid rgba(0, 0, 0, 0.603);
}

.taskIconDesc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 30px;
    width: 60%;
}

</style>