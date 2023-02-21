<template>
  <div>
    <!-- <canvas id="myChart" width="400" height="400"></canvas> -->
    <Doughnut v-if="showGraphic" :data="data" :options="options" />
  </div>
</template>

<script setup>
import { onMounted, onUpdated, reactive, ref, watch } from "vue";
import { Chart } from "chart.js/auto";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
import { Doughnut } from "vue-chartjs";

const props = defineProps({
  incompleteTasks: Array,
  completedTasks: Array,
});
let data = {};
let showGraphic = ref(false);

// DEFINIMOS LOS EMITS
const emit = defineEmits(["getTasks"]);

const incompleteTasks = ref(props.incompleteTasks);

onUpdated(() => {
  emit("getTasks");
  data = {
    labels: ["Completed", "Incompleted"],
    datasets: [
      {
        backgroundColor: ["rgb(75, 192, 124, 1)", "rgb(255, 99, 132)"],
        data: [props.completedTasks.length, props.incompleteTasks.length],
      },
    ],
  };
  showGraphic = ref(true);
  // console.log(showGraphic.value);
  // console.log([props.incompleteTasks.length, props.completedTasks.length]);
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<style scoped>
</style>>
