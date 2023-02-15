<template>
    <div>
        <canvas id="myChart" width="400" height="400"></canvas>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch } from 'vue'
import { Chart } from "chart.js/auto"
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";

const labels = [
  "Incomplete",
  "Complete"
]

const data = {
  labels: labels,
  datasets: [{
    label: "My currents tasks",
    data: [2, 3],
    backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 124, 1)'],
    // data: [completedTasks.value, incompleteTasks.value]
  }]
}

const config = {
  type: 'doughnut',
  data: data,
  options: {}
};

onMounted(() => {
const myChart = new Chart(
    document.getElementById('myChart'),
    config
)
})

const getIncTasks = async() => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .match({ user_id: useUserStore().user.id });
    tasksArr.value = tasks;
    return tasksArr.value;
}




</script>

<style scoped>

</style>>
