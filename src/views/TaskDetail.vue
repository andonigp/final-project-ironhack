<template>
  <Nav />
  <div class="taskCardDesc" v-if="allowed === true">
    <div class="taskDueDate">
      <label for="">Due date:</label>
      <label class="dueDateLabel">{{ taskDueDate }}</label>
    </div>
    <div class="taskTitle">
      <h1 v-if="editToggle === true">{{ taskTitle }}</h1>
      <input
        class="editTaskTitle"
        type="text"
        v-if="editToggle === false"
        v-model="taskTitle"
      />
    </div>
    <div class="taskPart singleUser" v-if="singleUser === true">
      <img
        :src="
          avatar_created_Img
            ? avatar_created_Img
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
        "
        alt="Profile picture"
      />
      <h6>Task created and to be solved by:</h6>
      <h4>{{ taskCreatedBy }}</h4>
    </div>

    <div class="taskIdentifier" v-if="singleUser === false">
      <div class="taskPart">
        <img
          id="cardImgDesc"
          :src="
            avatar_created_Img
              ? avatar_created_Img
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
          "
          alt="Profile picture"
        />
        <h6>Task created by:</h6>
        <h4>{{ taskCreatedBy }}</h4>
      </div>
      <div class="taskPart">
        <img
          id="cardImgDesc"
          :src="
            avatar_responsable_Img
              ? avatar_responsable_Img
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
          "
          alt="Profile picture"
        />
        <h6>Task responsable:</h6>
        <h4>{{ taskAsignedTo }}</h4>
      </div>
    </div>
    <hr />
    <div class="taskChars">
      <h4>{{ taskCreationDate }}</h4>
      <h4>{{ taskCreationHour }}</h4>
      <h4>{{ taskStatus }}</h4>
    </div>
    <hr />
    <p class="taskDesc" v-if="editToggle === true">{{ taskDescription }}</p>
    <div v-if="editToggle === false" class="textareaEdit">
      <textarea cols="70" rows="10" v-model="taskDescription">{{
        taskDescription
      }}</textarea>
      <div class="input-button">
        <button class="button" @click="editTask">Submit Changes</button>
      </div>
    </div>
    <div class="taskIconDesc">
      <i
        class="fas fa-toggle-off"
        @click="statusToggle"
        v-if="taskStatus === 'Incomplete'"
      ></i>
      <i
        class="fas fa-toggle-on"
        @click="statusToggle"
        v-if="taskStatus === 'Completed'"
      ></i>
      <router-link to="/" v-if="singleUser === true">
        <i class="fas fa-trash-alt" @dblclick="deleteTask"></i>
      </router-link>
      <i class="fas fa-edit" @click="editToggleFunc"></i>
    </div>
  </div>
  <div class="taskCardDesc" v-if="allowed === false">
    <i class="fas fa-exclamation-triangle"></i>
    <h1 class="taskTitle">{{ taskTitle }}</h1>
  </div>
  <Footer />
</template>

<script setup>
import Nav from "../components/Nav.vue";
import { useTaskStore } from "../stores/task";
import { useUserStore } from "../stores/user";
import { onMounted, onUpdated, ref } from "vue";
import { supabase } from "../supabase";
import Footer from "../components/Footer.vue";

const taskStore = useTaskStore();


//  ------------------ Get URL Instance -----------------
function getCurrentURL() {
  return window.location.href;
}

// Example
let url = getCurrentURL().split("/");
url = url[4];
console.log(url);

const singleUser = ref(false);
const allowed = ref(true);
const taskInfo = ref([]);
const taskTitle = ref("");
const taskCreationDate = ref("");
const taskCreationHour = ref("");
const taskCreatedBy = ref("");
const taskAsignedTo = ref("");
let taskStatus = ref("");
const taskDescription = ref("");
let taskDueDate = ref("");
const avatar_created_Img = ref("");
const avatar_responsable_Img = ref("");
const taskId = ref("");
const getInfo = async () => {
  taskInfo.value = await taskStore.fetchTasksInformation(url);
  console.log(taskInfo.value[0]);

  const { data: dataIncomplete } = await supabase
    .from("profiles")
    .select("email")
    .eq("user_id", taskInfo.value[0].user_id);
  taskAsignedTo.value = dataIncomplete;
  taskAsignedTo.value = taskAsignedTo.value[0].email;

  if (
    taskInfo.value[0].user_id === useUserStore().user.id ||
    taskInfo.value[0].asignedBy === useUserStore().user.email
  ) {
    if (taskAsignedTo.value === taskInfo.value[0].asignedBy) {
      singleUser.value = true;
      console.log(singleUser.value);
      console.log("SINGLE USER");
    }

    taskTitle.value = taskInfo.value[0].title;
    taskCreationDate.value = taskInfo.value[0].created_at.split("T")[0];
    taskCreationHour.value = taskInfo.value[0].created_at.split(".");
    taskCreationHour.value = taskCreationHour.value[0].split("T")[1];
    taskCreatedBy.value = taskInfo.value[0].asignedBy;

    const { data: avatarImgCr } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("email", taskCreatedBy.value);
    avatar_created_Img.value = avatarImgCr;
    avatar_created_Img.value = avatar_created_Img.value[0].avatar_url;

    const { data: avatarImg } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("email", taskAsignedTo.value);
    avatar_responsable_Img.value = avatarImg;
    avatar_responsable_Img.value = avatar_responsable_Img.value[0].avatar_url;

    if (taskInfo.value[0].is_complete === true) {
      taskStatus.value = "Completed";
      console.log(taskStatus.value);
    } else {
      taskStatus.value = "Incomplete";
    }
    taskDescription.value = taskInfo.value[0].description;

    taskDueDate.value = taskInfo.value[0].due;
    // console.log(taskDueDate)
    taskId.value = taskInfo.value[0].id;
  } else {
    taskTitle.value = "You are not allowed to this task's detail. Sorry";
    allowed.value = false;
  }
};

const editToggle = ref(true);
const editToggleFunc = async () => {
  editToggle.value = !editToggle.value;
  console.log(editToggle.value);
};

const editTask = async () => {
  await taskStore.editTakUpdate(url, taskTitle.value, taskDescription.value);
  editToggle.value = true;
  console.log(editToggle.value);
};

const deleteTask = async () => {
  await taskStore.deleteTask(url);
};

getInfo();

const statusToggle = async () => {
  taskInfo.value[0].is_complete = !taskInfo.value[0].is_complete;
  await taskStore.changeTaskStatus(url, taskInfo.value[0].is_complete);
  console.log(taskInfo.value[0].is_complete);
  getInfo();
};

onMounted(() => {
  getInfo();
  // getImages()
});

// -----------------------------------------------------------------------------------------------
// ---------------------------------------COUNT DOWN----------------------------------------------
// -----------------------------------------------------------------------------------------------

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const dueDate = new Date(taskDueDate.value);

const setInterval = async () => {
  const currentDate = new Date();
  const dueDateTime = taskDueDate.value - currentDate;
  console.log(dueDateTime);

  seconds.value = parseInt(dueDateTime / 1000);
  minutes.value = parseInt(seconds.value / 60);
  hours.value = parseInt(minutes.value / 60);
  days.value = parseInt(hours.value / 60);
};

setInterval();
console.log(days.value);
</script>

<style scoped>
.taskDueDate {
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin-bottom: 50px;
}

.taskDueDate label {
  font-style: italic;
}

.dueDateLabel {
  font-weight: bold;
}
</style>