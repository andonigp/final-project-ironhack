<template>
  <div class="signUpContainer">
    <img src="../../assets/images/logo.png" alt="">
    <div class="header">
      <div class="header-description">
        <h1 class="header-title">Register to Mind Capital<br>Task Manager</h1>
        <h3 class="header-subtitle">Start organizing your tasks!</h3>
      </div>
    </div>

    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="signUpForm">
        <div class="signUpform-input">
          <!-- <label class="input-field-label">E-mail</label> -->
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="signUpform-input">
          <!-- <label class="input-field-label">Password</label> -->
          <input
            type="password"
            class="input-field"
            placeholder="Password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <div class="signUpform-input">
          <!-- <label class="input-field-label">Confirm password</label> -->
          <input
            type="password"
            class="input-field"
            placeholder="Confirm Password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button class="signUpButton" type="submit">Sign Up</button>
        <p>
          Have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>

    <div v-show="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style>

</style>
