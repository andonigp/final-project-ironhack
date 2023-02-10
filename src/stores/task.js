import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Esta tienda utiliza el Composition API


export const useTaskStore = defineStore("tasks", () => {
  const tasksArr = ref(null);
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false })
      .match({ user_id: useUserStore().user.id });
    tasksArr.value = tasks;
    return tasksArr.value;
  };
  
  const addTask = async (title, description) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
  };

  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };

  const changeTaskStatus = async (id, is_complete) => {
    const { data, error } = await supabase.from("tasks").update({is_complete: !is_complete}).match({
      id:id,
    })
  }

  const editTakUpdate = async (id, title, description) => {
    const { data, error } = await supabase.from("tasks").update({
      title: title,
      description: description
    }).match({id: id})
  }

  return { tasksArr, fetchTasks, addTask, deleteTask, changeTaskStatus, editTakUpdate };
});
