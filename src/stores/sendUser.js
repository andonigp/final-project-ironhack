import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { ref } from "vue"
import { useUserStore } from "./user";


export const useSendUser = defineStore("sendUser", () => {
    const sendToUser = ref("");
    const fetchOtherUser = async (e) => {
        const { data: profile } = await supabase.from('profiles').select('user_id').match({ email: e });
        sendToUser.value = profile[0].user_id;
        console.log(sendToUser.value);
        return profile[0].user_id;
    };

    const registerSentTask = async (sentTo, sentTitle, sentDue, sendDescription, userEmail, global_task_id) => {
        console.log("Registering task.")
        const { data, error } = await supabase.from("sentTasks").insert([
            {
                user_id: useUserStore().user.id,
                sentTo: sentTo,
                title: sentTitle,
                due: sentDue,
                description: sendDescription,
                is_complete: false,
                asignedTo: userEmail,
                global_task_id: global_task_id,
                asignedBy: useUserStore().user.email,
            }
        ])
    };

    const sendTask = async (sentTo, sentTitle, description, global_task_id, due_date) => {
        console.log("Sending Task");
        const { data, error } = await supabase.from("tasks").insert([
            {
                user_id: sentTo,
                title: sentTitle,
                is_complete: false,
                description: description,
                global_task_id: global_task_id,
                asignedBy: useUserStore().user.email,
                due: due_date
            }
        ])
    };

    const sentTasksArr = ref(null)
    const fecthSentTasks = async () => {
        const { data: tasks } = await supabase
            .from("sentTasks")
            .select("*")
            .order("id", { ascending: false })
            .match({ user_id: useUserStore().user.id });
        sentTasksArr.value = tasks;
        return sentTasksArr.value;
    }

    const userAsigned = ref(null)
    const fecthAsignedUser = async (e) => {
        const { data: tasks } = await supabase
            .from("profiles")
            .select("name", "last_name")
            .match({ user_id: e });
        userAsigned.value = tasks;
        return userAsigned.value;
    }

    const deleteSentTask = async (id) => {
        const { data, error } = await supabase.from("sentTasks").delete().match({
            global_task_id: id,
        });
    };



    return { fetchOtherUser, registerSentTask, sendTask, sentTasksArr, fecthSentTasks, fecthAsignedUser, deleteSentTask }
})