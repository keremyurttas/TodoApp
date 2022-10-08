import { createStore } from "vuex";

import { api } from "@/api/api";
import { filterFirebaseKeys } from "@/utils/utils";
export default createStore({
  state: {
    allDiscussions: [],
  },
  getters: {},
  mutations: {
    SendNewDiscussionToLocal(state, payload) {
      state.allDiscussions.push({
        subject: payload.discussionSubject,
        owner: localStorage.getItem("activeUser"),
        createdTime: payload.time,
        comments: [],
      });
    },
  },
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
      // state.allDiscussions = data;
      let allDiscussions = data;
      allDiscussions = filterFirebaseKeys(data);
      allDiscussions = await allDiscussions.map((dc) => ({
        ...dc,
        comments: filterFirebaseKeys(dc.comments),
      }));
      allDiscussions.forEach((dsc) => {
        dsc.comments.forEach((comment) => {
          comment.vote = filterFirebaseKeys(comment.vote);
        });
      });
      state.allDiscussions = allDiscussions;
      console.log("data:", allDiscussions);
      console.log(state);
      return error;
    },
    async sendNewDiscussion({ state }, payload) {
      const [err, data] = await api({
        method: "post",
        URL: `.json`,
        body: {
          subject: payload.discussionSubject,
          owner: localStorage.getItem("activeUser"),
          createdTime: payload.time,
          comments: [],
        },
      });
      console.log(state);
      console.log(data);
      return err;
    },
  },
  modules: {},
});
