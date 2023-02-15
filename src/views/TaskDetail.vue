<template>
    <Nav />
    <h1></h1>
</template>

<script setup>
import Nav from '../components/Nav.vue';
import { useTaskStore } from "../stores/task";

//  ------------------ Get URL Instance -----------------
function getCurrentURL () {
    return window.location.href
  }
  
  // Example
  let url = getCurrentURL().split("/")
  url = url[4]
  console.log(url)

</script>

<style scoped>

</style>