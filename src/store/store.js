import { createStore } from "vuex";
import { firebase } from "firebase/app";

import { api } from "@/api/api";
import { filterFirebaseKeys } from "@/utils/utils";
export default createStore({
  state: {
    users: [],
  },
  getters: {
    getUserNames(state) {
      return state.users;
    },
  },
  mutations: {},
  actions: {
    // getUsers({ state }) {
    //   state.users = [
    //     {
    //       name: "kerem",
    //       age: 20,
    //     },
    //     {
    //       name: "rahmi",
    //       age: 30,
    //     },
    //   ];
    // },
    async fetchData({ state }) {
      const [error, data] = await api({ method: "get", URL: "/.json" });
      const filteredData = filterFirebaseKeys(data);
      state.discussions = filteredData;
      console.log("data:", filteredData);
      console.log(error);
      console.log(state);
    },
    async login({ state }, user) {
      try {
        const val = await firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password);
        this.$router.push("/discussions");
        window.localStorage.setItem("activeUser", val.user.email);
        console.log(state);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
