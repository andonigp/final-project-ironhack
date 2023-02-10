<template>
  <Nav />
  <div class="accountContainer">
    
    <div class="accauntContainerHeader">
      <img id="profilePicture" :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
      <div class="labelContainer" v-if="editData">
        <label for="chooseImage" v-if="editData" class="imageButton">Choose Image</label>
      </div>
      <input id="chooseImage" class="hidden" type="file" style="display: none;" v-on:input="uploadImage">
      <h1 v-if="!editData">{{ editName }} {{ editLastName }}</h1>
    </div>
    <div class="accauntContainerData">
      <div class="accauntContainerDataLeft">
        <label for="name">First name:</label>
        <h4 v-if="!editData">{{ editName }}</h4>
        <input v-if="editData" type="text" v-model="editName">
        <label for="last_name">Last name:</label>
        <h4 v-if="!editData">{{ editLastName }}</h4>
        <input v-if="editData" type="text" v-model="editLastName">
        <label for="email">Email:</label>
        <h4 v-if="!editData">{{ editEmail }}</h4>
        <input v-if="editData" type="text" v-model="editEmail">
        <label for="phone">Phone:</label>
        <h4 v-if="!editData">{{ editPhone }}</h4>
        <input v-if="editData" type="text" v-model="editPhone">
        <label for="web_site">Web site:</label>
        <h4 v-if="!editData">{{ editWebPage }}</h4>
        <input v-if="editData" type="text" v-model="editWebPage">
      </div >
      <div class="accauntContainerDataRight">
        <label for="street_number">Street & Number:</label>
        <h4 v-if="!editData">{{ editStreet }}</h4>
        <input v-if="editData" type="text" v-model="editStreet">
        <label for="neighborhood">Neighborhood:</label>
        <h4 v-if="!editData">{{ editNeighborhood }}</h4>
        <input v-if="editData" type="text" v-model="editNeighborhood">
        <label for="zip_code">Zip Code:</label>
        <h4 v-if="!editData">{{ editZipCode }}</h4>
        <input v-if="editData" type="text" v-model="editZipCode">
        <label for="city">City:</label>
        <h4 v-if="!editData">{{ editCity }}</h4>
        <input v-if="editData" type="text" v-model="editCity">
        <label for="country">Country:</label>
        <h4 v-if="!editData">{{ editCountry }}</h4>
        <input v-if="editData" type="text" v-model="editCountry">
      </div>
    </div>
    <button v-if="editData" @click="editProfile">Submit Changes</button>
    <i @click="editDataToggle" class="fas fa-edit"></i>
  </div>
  <Footer />
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';
  import Footer from '../components/Footer.vue';

  const userStore = useUserStore();

  const loading = ref(false);
  

  const editName = ref("")
  const editLastName = ref("")
  const editEmail = ref("")
  const editPhone = ref("")
  const editWebPage = ref("")
  const editStreet = ref("")
  const editNeighborhood = ref("")
  const editZipCode = ref("")
  const editCity = ref("")
  const editCountry = ref("")
  const avatar_url = ref(null);

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    editName.value = userStore.profile.name;
    editLastName.value = userStore.profile.last_name;
    editEmail.value = userStore.profile.email;
    editPhone.value = userStore.profile.phone;
    editWebPage.value = userStore.profile.web_site;
    editStreet.value = userStore.profile.street_number;
    editNeighborhood.value = userStore.profile.neighborhood;
    editZipCode.value = userStore.profile.zip_code;
    editCity.value = userStore.profile.city;
    editCountry.value = userStore.profile.country;
    avatar_url.value = userStore.profile.avatar_url;
  }

  const editProfile = async() => {
    await userStore.editProfile(
      editName.value, 
      editLastName.value, 
      editEmail.value,
      editPhone.value,
      editWebPage.value,
      editStreet.value,
      editNeighborhood.value,
      editZipCode.value,
      editCity.value,
      editCountry.value 
    )
    console.log("Profile Edited")
    editData.value = !editData.value
  }

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  const editData = ref(false)
  const editDataToggle = () => {
    editData.value = !editData.value
  }

  
  const uploadImage = async(e) => {
    const chosenImage = document.getElementById("chooseImage")
    console.log("In")
    console.log(e.target.files[0])
    supabase.storage.from("avatars").update(e.target.files[0])
  }



</script>

<style>
</style>