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

    const registerSentTask = async (sentTo, sentTitle, sentDue, sendDescription) => {
        console.log("Registering task.")
        const { data, error } = await supabase.from("sentTasks").insert([
            {
                user_id: useUserStore().user.id,
                sentTo: sentTo,
                title: sentTitle,
                due: sentDue,
                description: sendDescription,
                is_complete: false,
            }
        ])
    };

    const sendTask = async (sentTo, sentTitle, description) => {
        console.log("Sending Task");
        const { data, error } = await supabase.from("tasks").insert([
            {
                user_id: sentTo,
                title: sentTitle,
                is_complete: false,
                description: description,
            }
        ])
    };

    return { fetchOtherUser, registerSentTask, sendTask }
})