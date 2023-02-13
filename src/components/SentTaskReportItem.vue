<template>

    <div class="sentTaskTableElement">
        <i class="fas fa-trash-alt"></i>
        <label class="sentToLabel" for="to">{{ sentTask.asignedTo }}</label>
        <label class="dueDateLabel" for="due">{{ sentTask.due }}</label>
        <label class="titleLabel" for="title">{{ sentTask.title }}</label>
        <label class="completedLabel" for="is_complete">{{ sentTask.is_complete }}</label>
        <i class="fad fa-flashlight"></i>
    </div>
    <hr>
</template>

<script setup>
import { onUpdated } from '@vue/runtime-core';
import { useSendUser } from '../stores/sendUser';
import { ref } from 'vue';
const props = defineProps({
    sentTask: Object,
});




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