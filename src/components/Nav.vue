<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <router-link to="/">
      <img src="../../assets/images/mind_blanco.png" alt="Company Logo" class="navImg">
    </router-link>

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

</script>

<style>

nav {
  background-color: #203267;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  color: white;
  margin-bottom: 30px;
}

.navImg {
  width: 70%;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

}

nav ul li a {
  text-decoration: none!important;
  list-style: none!important;
  color: white;
}

nav ul li a:hover {
  font-weight: 600;
}

nav ul li button {
  background: #f68520;
  border-width: 0;
  padding: 10px;
  color: white;
  border-radius: .25rem;
}
</style>
