<template>

    <div class="sentTaskTableElement">
        <i class="fas fa-trash-alt" @click="deleteSentTask" ></i>
        <label class="sentToLabel" for="to">{{ sentTask.asignedTo }}</label>
        <label class="dueDateLabel" for="due">{{ sentTask.due }}</label>
        <label class="titleLabel" for="title">{{ sentTask.title }}</label>
        <label class="completedLabel" for="is_complete">{{ sentTask.is_complete }}</label>
        <i class="fas fa-info-circle"></i>
    </div>
    <hr>
</template>

<script setup>
import { onUpdated } from '@vue/runtime-core';
import { useTaskStore } from '../stores/task';
import { useSendUser } from '../stores/sendUser';
import { ref } from 'vue';
const props = defineProps({
    sentTask: Object,
});


const deleteSentTask = async() => {
    await useTaskStore().deleteTaskSent(props.sentTask.global_task_id)
    console.log("Deleted from Tasks table.")
    await useSendUser().deleteSentTask(props.sentTask.global_task_id)
    console.log("Deleted drom Sent Tasks table.")
}



</script>



<style scoped>
.sentTaskTableElement {
    padding-left: 90px;
}

.sentTaskTableElement i {
    margin-left: 15px;
}

.sentToLabel {
    width: 200px;
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
    text-overflow: hidden;
    margin-left: 20px;
}

.dueDateLabel {
    width: 100px;
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
    text-overflow: hidden;
    margin-left: 15px;
}

.titleLabel {
    width: 400px;
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
    text-overflow: hidden;
    margin-left: 15px;
}
</style>