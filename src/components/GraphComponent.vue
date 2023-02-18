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

const props = defineProps({
  incompleteTasks: Object,
  completedTasks: Object
})

const labels = [
  "Incomplete",
  "Complete"
]

const data = {
  labels: labels,
  datasets: [{
    label: "My currents tasks",
    data: [3, 2],
    backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 124, 1)'],
    // data: [completedTasks.value, incompleteTasks.value]
  }]
}

const config = {
  type: 'doughnut',
  data: data,
  options: {}
};



// const getIncomplete = ref('')
// const getComplete = ref('')
// const getCount = async() => {
//   const { data: dataIncomplete } = await supabase.from("tasks").select("id").eq( "is_complete" , false).eq("user_id", useUserStore().user.id)
//   getIncomplete.value = dataIncomplete.length
//   console.log(getIncomplete.value)

//   const { data: dataComplete } = await supabase.from("tasks").select("id").eq( "is_complete" , true).eq("user_id", useUserStore().user.id)
//   getComplete.value = dataComplete.length
//   console.log(getComplete.value)


//   return {getComplete, getIncomplete}
// }

// getCount()

onMounted(() => {
  // getCount();
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
)
})

// onUpdated(() => {
//   getCount();
// })

</script>

<style scoped>

</style>>
