<template>
    <Nav />
    <div class="sendTaskFlex">
        <div class="sendTaskContainer">
            <div class="sendTaskHeader">
                <h1>Send a Task</h1>
            </div>
            <div class="sendTaskSetup">
                <input id="sendToInput" type="text" v-model="sendTo" placeholder="Send task to: email@email.com">
                <input id="titleToInput" type="text" v-model="sendTitle" placeholder="Add a title to the task you are sending.">
                <label for="">Due date:</label>
                <input id="dueToInput" type="date" v-model="sendDue"> <br>
                <textarea id="descriptionToInput" cols="70" rows="10" placeholder="Type the task here." v-model="sendDescription"></textarea>
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
        <sentItem v-for="sentTask in sentTasks " :sentTask="sentTask"/>
    </div>
    <!-- <Footer />    -->
</template>

<script setup>
import Footer from '../components/Footer.vue';
import sentItem from '../components/SentTaskReportItem.vue';
import Nav from '../components/Nav.vue';
import { useSendUser } from "../stores/sendUser";
import {onUpdated, ref} from "vue"



const sendTo = ref('')
const sendTitle = ref('')
const sendDue = ref('')
const sendDescription = ref('')


const sendToUser = ref('')
const sendUser = useSendUser()

const getUserId = async() => {
    console.log(sendTo.value)
    // useSendUser().fetchOtherUser(sendTo.value)
    // console.log(useSendUser().fetchOtherUser(sendTo.value))
    sendToUser.value = await sendUser.fetchOtherUser(sendTo.value)
    console.log(sendToUser.value)
    await sendUser.registerSentTask(sendToUser.value, sendTitle.value, sendDue.value, sendDescription.value)
    await sendUser.sendTask(sendToUser.value, sendTitle.value, sendDescription.value)
    sendTo.value = "";
    sendTitle.value = "";
    sendDue.value = "";
    sendDescription.value = "";
    console.log("Your task has been sent.")
}

const printUser = () => {
    console.log(sendToUser)
}

const sentTasks = ref([]);

const getSentTasks = async() => {
    sentTasks.value = await useSendUser().fecthSentTasks()
}

getSentTasks();

onUpdated(() => {
    getSentTasks();
    // console.log(sentTasks.value)
})

</script>

<style>
.sendTaskContainer {
    background: white;
}


.sentTasksTableFlex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
}

.sentTaskTableHeader {
    display: flex;
    align-items: center;
    width: 1000px;
    height: 20px;
    background: #5e6881;
    margin: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: .25rem;
    margin-bottom: 0px;
    color: white;
    padding-left: 90px;
}

.sendTaskSetup {
    /* margin-left: 50px; */
    margin-bottom: 20px;
}

.sentTaskTableHeader i {
    padding-left: 15px;
}

.sentToH {
    width: 200px;
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
    text-overflow: hidden;
    margin-left: 20px;
    text-align: center;
}

.dueH {
    width: 100px;
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
    text-overflow: hidden;
    margin-left: 15px;
    text-align: center;
}

.titleH {
    width: 400px;
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
    text-overflow: hidden;
    margin-left: 15px;
    text-align: center;
}

#sendToInput {
    width: 100%;
    font-size: 15px;
    margin-bottom: 20px;
    border-radius: .25rem;
    border-width: 1px;
}

#titleToInput {
    width: 100%;
    font-size: 15px;
    margin-bottom: 20px;
    border-radius: .25rem;
    border-width: 1px;
}

#dueToInput {
    max-width: 30%;
    background: white;
    border-width: 1px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: .25rem;
    border-width: 1px;
}

#descriptionToInput {
    background: white;
    border-width: 1px;
    width: 600px;
    border-radius: .25rem;
    border-width: 1px;
}

.sentTaskTableElement {
    display: flex;

    align-items: center;
    width: 1000px;
    height: 20px;
    margin: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: .25rem;
    margin-bottom: 0px;
}

.sentTasksTableFlex hr {
    width: 1000px;
}

.sendTaskButton {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sendTaskButton button {
    background: #2d376dcb;
    color: white;
    padding: 1rem 10rem;
    border-radius: .75rem;
    font-weight: 600;
    font-size: 20px;
    border-width: 0;
}

</style>