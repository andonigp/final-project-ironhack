import { createApp } from "vue";
import { createPinia } from "pinia";
// import { VueSweetAlert2 } from "vue-sweetalert2";

import App from "./App.vue";
import router from "./router";

import './assets/style.css';

const app = createApp(App);


app.use(createPinia());
app.use(router);

app.mount("#app");
