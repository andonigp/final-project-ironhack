<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <router-link to="/">
      <img src="../../assets/images/mind_blanco.png" alt="Company Logo" class="navImg">
    </router-link>
    <label id = "navbar-toggle" class="navbar-toggle" for="toggle" @click="NavBarToggle">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
    </label>
    <ul>
        <li>
          <router-link to="/">Task Manager</router-link>
        </li>
        <li>
          <router-link to="/send">Send Task</router-link>
        </li>
        <li>
          <router-link to="/account">Profile</router-link>
        </li>
    </ul>

    <div>
      <ul>
        <li class="log-out-welcome">
          <p>Welcome, {{ useUserStore().user.email }}</p>
        </li>
        <li>
          <button @click="signOut" class="button">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';


//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    await useUserStore().signOut()
    redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};

//  ------------------ HAMBURGUER MENU -----------------
const hamburguer = document.getElementsByClassName(".navbar-toggle")
const navMenu = document.querySelector("nav ul")

console.log(hamburguer)
console.log(navMenu)

const NavBarToggle = async() => {
  hamburguer.classList.toggle("active");
}


// hamburguer.addEventListener("click", () => {
//     hamburguer.classList.toggle("active");
//     navMenu.classList.toggle("active");
// })

</script>

<style>


</style>
