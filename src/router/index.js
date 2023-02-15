import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import SendTask from "../views/SendTask.vue"
import Account from "../views/Account.vue"
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import TaskDetail from "../views/TaskDetail.vue"

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },
      { path: "signup", component: SignUp },
    ],
  },
  { path: "/", component: Home },
  { path: "/account", component: Account },
  { path: "/send", component: SendTask },
  { path: "/task/:id", component: TaskDetail, name: "taskDetail" }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
