import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { ref } from "vue"

// Esta tienda utiliza el Options API
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from('profiles')
          .select("*")
          .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        console.log('user in store: ', this.user);
        console.log('profile in store: ', this.profile);
      }
    },

    async editProfile(name, last_name, email, phone, web_site, street_number, neighborhood, zip_code, city, country, avatar_url) {
      const { user, error } = await supabase.from("profiles").update({
        name: name,
        last_name: last_name,
        email: email,
        phone: phone,
        web_site: web_site,
        street_number: street_number,
        neighborhood: neighborhood,
        zip_code: zip_code,
        city: city,
        country: country,
        avatar_url: avatar_url
      }).match({ user_id: this.user.id })
    },

    async editImage(avatar_url) {
      const { user, error } = await supabase.from("profiles").update({
        avatar_url: avatar_url
      }).match({ user_id: this.user.id })
    },

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);

        const { data: profile } = await supabase.from('profiles').insert([
          {
            user_id: this.user.id,
            email: email
          }
        ])
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },
        {
          shouldCreateUser: false,
        });
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        console.log('profile in store: ', profile);
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },



  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
