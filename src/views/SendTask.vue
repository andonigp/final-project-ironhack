<template>
  <Nav />
  <div class="sendTaskFlex">
    <div class="sendTaskContainer">
      <div class="sendTaskHeader">
        <h1>Send a Task</h1>
      </div>
      <div class="sendTaskSetup">
        <input
          id="sendToInput"
          type="text"
          v-model="sendTo"
          placeholder="Send task to: email@email.com"
        />
        <input
          id="titleToInput"
          type="text"
          v-model="sendTitle"
          placeholder="Add a title to the task you are sending."
        />
        <label for="">Due date:</label>
        <input id="dueToInput" type="date" v-model="sendDue" /> <br />
        <textarea
          id="descriptionToInput"
          cols="70"
          rows="10"
          placeholder="Type the task here."
          v-model="sendDescription"
        ></textarea>
      </div>
      <div class="sendTaskButton">
        <button @click="getUserId">Send Task</button>
      </div>
    </div>
  </div>
  <div class="sentTasksTableFlex">
    <div class="sentTaskTableHeader">
      <i class="fas fa-trash-alt"></i>
      <label class="sentToH" for="to">Sent to:</label>
      <label class="dueH" for="due">Due:</label>
      <label class="titleH" for="title">Task title:</label>
      <label for="is_complete">Completed</label>
      <i class="fad fa-flashlight"></i>
    </div>
    <sentItem v-for="sentTask in sentTasks" :sentTask="sentTask" />
  </div>
  <Footer />
</template>

<script setup>
import Footer from "../components/Footer.vue";
import sentItem from "../components/SentTaskReportItem.vue";
import Nav from "../components/Nav.vue";
import { useSendUser } from "../stores/sendUser";
import { onUpdated, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";

const sendTo = ref("");
const sendTitle = ref("");
const sendDue = ref("");
const sendDescription = ref("");

let global_task_id = ref("");
global_task_id = Math.random();
console.log(global_task_id);

const sendToUser = ref("");
const sendUser = useSendUser();

const getUserId = async () => {
  console.log(sendTo.value);
  // useSendUser().fetchOtherUser(sendTo.value)
  // console.log(useSendUser().fetchOtherUser(sendTo.value))
  if (!sendTo || !sendTitle || !sendDue || !sendDescription) {
    alert(
      "You are missing information on your task setup. Please fill all the required information."
    );
  } else {
    sendToUser.value = await sendUser.fetchOtherUser(sendTo.value);
    console.log(sendToUser.value);

    await sendUser.registerSentTask(
      sendToUser.value,
      sendTitle.value,
      sendDue.value,
      sendDescription.value,
      sendTo.value,
      global_task_id
    );
    await sendUser.sendTask(
      sendToUser.value,
      sendTitle.value,
      sendDescription.value,
      global_task_id,
      sendDue.value
    );
    sendTo.value = "";
    sendTitle.value = "";
    sendDue.value = "";
    sendDescription.value = "";
    console.log("Your task has been sent.");
  }
};

const printUser = () => {
  console.log(sendToUser);
};

const sentTasks = ref([]);

const getSentTasks = async () => {
  sentTasks.value = await useSendUser().fecthSentTasks();
};

getSentTasks();

onUpdated(() => {
  getSentTasks();
  // console.log(sentTasks.value)
});
</script>

<style>
</style>