<!-- COMPONENTE BOILERPLATE -->
 
  <template>

  <div class="signInContainer">
    <img src="../../assets/images/logo.png" alt="">
    <h1>Welcome to Mind Capital <br>
    System</h1>
    <h3>Sign In</h3>

    <form @submit.prevent="signIn">
      <div class="signInForm">
        <div class="emailSignIn">
          <input type="text" placeholder="User email" v-model="email">
        </div>
        <div class="passwordSignIn">
          <input type="password" placeholder="Password" v-model="password">
        </div>
        <div class="signInButton">
          <button type="submit"> Sign In</button>
        </div>
      </div>
    </form>
    <div v-show="errorMsg">{{errorMsg}}</div>
    
    
    <!-- <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p> -->
    <p>Dont have an account? <a href="mindcapital.com.mx/">Contact us</a></p>
  </div>

</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Information input
const email = ref("")
const password = ref("")

// Error Message
const errorMsg = ref("")

// Router to push user once SignedUp to Log In
const redirect = useRouter();


// Arrow function to Signin user to supaBase
const signIn = async () => {
  if (email.value !== null || password.value !== null){
    try {
      await useUserStore().signIn(email.value, password.value);
      redirect.push({ path: "/"})
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    errorMsg.value = "Error: email or/and password are incorrect or not found.";
  }
};
</script>

<style></style>
