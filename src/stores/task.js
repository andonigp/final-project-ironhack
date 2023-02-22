import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Esta tienda utiliza el Composition API


export const useTaskStore = defineStore("tasks", () => {
  const tasksArr = ref(null);
  const fetchTasks = async (orderBy, orderFlow) => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order(orderBy, { ascending: orderFlow })
      .match({ user_id: useUserStore().user.id });
    tasksArr.value = tasks;
    return tasksArr.value;
  };

  const tasksArrInc = ref(null);
  const fetchTasksInc = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .match({ user_id: useUserStore().user.id, is_complete: false });
    tasksArrInc.value = tasks;
    return tasksArrInc.value;
  };

  const tasksArrComp = ref(null);
  const fetchTasksComp = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .match({ user_id: useUserStore().user.id, is_complete: true });
    tasksArrComp.value = tasks;
    return tasksArrComp.value;
  };

  const addTask = async (title, description, dueDate) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
        due: dueDate,
        asignedBy: useUserStore().user.email,
      },
    ]);
  };

  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };

  const deleteTaskSent = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      global_task_id: id,
    });
  };

  const changeTaskStatus = async (id, is_complete) => {
    const { data, error } = await supabase.from("tasks").update({ is_complete: !is_complete }).match({
      id: id,
    });
  }

  const changeSentTaskStatus = async (global_task_id, is_complete) => {
    const { data, error } = await supabase.from("sentTasks").update({ is_complete: !is_complete }).match({
      global_task_id: global_task_id,
    });
  }

  const editTakUpdate = async (id, title, description) => {
    const { data, error } = await supabase.from("tasks").update({
      title: title,
      description: description
    }).match({ id: id })
  }

  const avatar_url = ref(null)
  const asignedByImg = async (emailId) => {
    const { data: avatar } = await supabase.from("profiles").select("*").match({ email: emailId });
    avatar_url.value = avatar;
    // console.log(avatar_url.value[0].avatar_url)
    // console.log(avatar_url.value)
    // return avatar_url.value[0].avatar_url
    return avatar_url.value
  }

  const tasksInformation = ref('');
  const fetchTasksInformation = async (id) => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .match({ id: id });
    tasksInformation.value = tasks;
    return tasksInformation.value;
  };

  const tasksArrByGlobal = ref(null);
  const fetchTasksByGlobal = async (global_task_id) => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .match({ global_task_id: global_task_id });
    tasksArrByGlobal.value = tasks;
    return tasksArrByGlobal.value;
  };

  return {
    tasksArr,
    fetchTasks,
    addTask,
    deleteTask,
    changeTaskStatus,
    editTakUpdate,
    changeSentTaskStatus,
    asignedByImg,
    deleteTaskSent,
    fetchTasksInc,
    fetchTasksComp,
    fetchTasksInformation,
    fetchTasksByGlobal
  };
});
