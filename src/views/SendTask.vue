<template>
    <Nav />
    <div class="sendTaskFlex">
        <div class="sendTaskContainer">
            <div class="sendTaskHeader">
                <h1>Send a Task</h1>
            </div>
            <div class="sendTaskSetup">
                <label for="to">To:</label>
                <input id="sendToInput" type="text" v-model="sendTo"> <br>
                <label for="title">Title:</label>
                <input id="titleToInput" type="text" v-model="sendTitle">
                <label for="due">Due date:</label>
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
            <label for="to">To</label>
            <label for="due">Due</label>
            <label for="title">Title</label>
            <label for="is_complete">Completed</label>
            <label for="description">Description</label>
        </div>
        <div class="sentTaskTableElement">
            <i class="fas fa-trash-alt"></i>
            <label for="to">agoico@gmail.com</label>
            <label for="due">10/02/2023</label>
            <label for="title">Corregir el footer</label>
            <label for="is_complete">False</label>
            <label for="description">This is a description.</label>
        </div>
        <hr>
        <div class="sentTaskTableElement">
            <i class="fas fa-trash-alt"></i>
            <label for="to">agoico@gmail.com</label>
            <label for="due">10/02/2023</label>
            <label for="title">Corregir el footer</label>
            <label for="is_complete">False</label>
            <label for="description">This is a description.</label>
        </div>
        <hr>
    </div>
    <!-- <Footer />    -->
</template>

<script setup>
import Footer from '../components/Footer.vue';
import Nav from '../components/Nav.vue';
import { useSendUser } from "../stores/sendUser";
import {ref} from "vue"

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



</script>

<style>
.sentTasksTableFlex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
}

.sentTaskTableHeader {
    display: flex;
    justify-content: space-evenly;
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
}

.sendTaskSetup {
    margin-left: 50px;
    margin-bottom: 20px;
}

#sendToInput {
    max-width: 80%;
    margin-bottom: 5px;
    background: #eaf0fe;
    border-width: 1px;
}

#titleToInput {
    max-width: 40%;
    margin-right: 5px;
    margin-bottom: 5px;
    background: #eaf0fe;
    border-width: 1px;
}

#dueToInput {
    max-width: 21%;
    background: #eaf0fe;
    border-width: 1px;
    /* margin-right: 5px; */
}

#descriptionToInput {
    background: #eaf0fe;
    border-width: 1px;
}

.sentTaskTableElement {
    display: flex;
    justify-content: space-evenly;
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

</style>