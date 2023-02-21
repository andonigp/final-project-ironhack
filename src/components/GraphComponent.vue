<template>
    <div>
        <!-- <canvas id="myChart" width="400" height="400"></canvas> -->
        <Doughnut :data="data" :options="options" />
    </div>
</template>

<script setup>
import { onMounted, onUpdated, reactive, ref, watch } from 'vue'
import { Chart } from "chart.js/auto"
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
import { Doughnut } from 'vue-chartjs'


const props = defineProps({
  incompleteTasks: Object,
  completedTasks: Object
})

let myChart

const incompleteTasks = ref(props.incompleteTasks)

onMounted(() => {
  console.log( props.incompleteTasks.length)
  console.log( props.completedTasks.length)
  setInterval(() => {
    data.value = data.value
  }, 3000)

  // myChart = new Chart(
  //   document.getElementById('myChart'),
  //   config
  // )
})

watch (() => props.incompleteTasks, () => {
  console.log("WATCHER")
  console.log(props.incompleteTasks.length)

  // data.data = [props.incompleteTasks.length, props.completedTasks.length]
  // config.data = data;
  // console.log(config.data)
  // console.log('DATA DE PROPS', data.data)
  // myChart.destroy()
  // myChart = new Chart(
  //   document.getElementById('myChart'),
  //   config
  // )
})

onUpdated(() => {
  console.log("Updating")
  console.log( props.incompleteTasks.length)
  console.log( props.completedTasks.length)
  
  // if (myChart) {
  //   myChart.destroy()
  //   const myChart = new Chart(
  //     document.getElementById('myChart'),
  //     config
  //   )
  // }


})


// const labels = [
//   "Incomplete",
//   "Complete"
// ]

// const data = {
//   labels: labels,
//   datasets: [{
//     label: "My currents tasks",
//     // data: [props.incompleteTasks, props.completedTasks],

//     data: [props.incompleteTasks.length, props.completedTasks.length],
//     backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 124, 1)'],
//     // data: [completedTasks.value, incompleteTasks.value]
//   }]
// }

// const config = {
//   type: 'doughnut',
//   data: data,
//   options: {}
// };

const data = {
  labels: ['Completed', 'Incompleted'],
  datasets: [
    {
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 124, 1)'],
      data: [6, 4],
      // data: [props.incompleteTasks.length, props.completedTasks.length]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}









</script>

<style scoped>

</style>>
