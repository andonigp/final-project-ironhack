<template>
<div id="card" class="taskContainer whiteColor" :class="{'greenColor': statusIcon, 'redColor': !statusIcon}">
    
    <!-- <label class="labelAsignedBy" for="">By: {{ task.asignedBy }}</label> -->
    <div>
        <div class="cardHeader">
            <p v-if="task.is_complete === false">Incomplete</p>
            <p v-else>Complete</p>
            <img id="cardImg" :src="avatar_Img ? avatar_Img : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
        </div>
        <h3 v-if="etOption === false">{{task.title}}</h3>
        <h4 v-if="etOption === false">{{ task.description }}</h4>
        <div class="taskEditInputs" v-if="etOption === true">
            <h3>{{ editedTitle }}</h3>
            <input type="text" v-model="editedTitle">
            <textarea name="" id="" cols="30" rows="10" v-model="editedDescription"></textarea>
            <button  @click="editChanges">Submit Changes</button>
        </div>
        <div class="taskIcon">
            <i class="fas fa-toggle-off" @click="changeStatus" v-if="statusIcon === false"></i>
            <i class="fas fa-toggle-on" @click="changeStatus" v-if="statusIcon === true"></i>
            <i class="fas fa-trash-alt" @click="deleteTask" v-if="isSent"></i>
            <i class="fas fa-edit" @click="etOptionSwap"></i>
            <router-link :to="taskId">
                <i class="fas fa-info-circle"></i>
            </router-link>
        </div>
    </div>
</div>
</template>

<script setup>
// IMPORTS
import { onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
const router = useRouter()

// DEFINIMOS IMPORTS QUE VENDRÁN DE HOME
const props = defineProps({
    task: Object,
});

// DEFINIMOS LOS EMITS
const emit = defineEmits ([
    "getTasks"
])

// IMPORTAMOS EL SONIDO DE ALERTA
const audioAlert = new Audio("../../assets/sounds/alert.mp3")

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------


// CONSTRUCCIÓN DEL VINCULO PARA REVISAR LA INFORMACIÓN DETALLADA DEL TASK.
const taskId = ref("/task/" + props.task.id)
// console.log(taskId.value)

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos 
// la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. 
// Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
    emit("getTasks")
};

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// OBTENCIÓN DEL URL DE LA IMAGEN DEL USUARIO CREADOR DEL TASK
const avatar_Img = ref('')
const getAvatar = async() => {
    avatar_Img.value = await taskStore.asignedByImg(props.task.asignedBy)
    avatar_Img.value = avatar_Img.value[0].avatar_url
    return avatar_Img.value
}
onMounted(() => {
    getAvatar()
})


// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// FUNCION UTILIZADA PARA MODIFICAR EL STATUS DEL TASK (TRUE / FALSE) 
let statusIcon = ref(props.task.is_complete)
const changeStatus = async() => {
    await taskStore.changeTaskStatus(props.task.id, props.task.is_complete)
    statusIcon.value = !statusIcon.value
    await taskStore.changeSentTaskStatus(props.task.global_task_id, props.task.is_complete)
    emit("getTasks")
};

// FUNCION UTILIZADA PARA HABILITAR LA FUNCIONALIDAD DEL EDIT EL STATUS DE UNA TASK.
const taskStore = useTaskStore();
let etOption = ref(false)
const etOptionSwap = () => {
    etOption.value = !etOption.value
    console.log(etOption)
    emit("getTasks")
}
const editedTitle = ref(props.task.title);
const editedDescription = ref(props.task.description);

// GUARDAR CAMBIOS REALIZADOS A LA TAREA
const editChanges = async() => {
    await taskStore.editTakUpdate(props.task.id, editedTitle.value, editedDescription.value)
    etOption.value = !etOption.value
    audioAlert.play()
    emit("getTasks")
}

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// VARIABLES QUE PERMITEN IDENTFICAR SI EL USUARIO ACTIVO ES EL MISMO QUE CREO ESTA TASK.
// DE NO SER ASÍ DESHABILITARÁ LA POSIBILIDAD DE BORRAR LA TASK.
const isSent = ref(true)
const isSentValue = ref(props.task.global_task_id)
const isSentTask = async() => {
    if (isSentValue.value > 0) {
        isSent.value = !isSent.value
    }
}
isSentTask()

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
</script>

<style>

.redColor {
    background-color: rgba(255, 0, 0, 0.24);
}

.greenColor {
    background-color: rgba(0, 128, 0, 0.24);
}

.labelAsignedBy {
    text-align: end;
    font-size: 13px;
}

#cardImg {
    height: 50px;
    width: 50px;
    max-height: 70%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0px 6px 8px 0px #88888898;
    border: 1px solid rgba(0, 0, 0, 0.603);
}

.cardHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
}

</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
