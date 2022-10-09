import { createStore } from "vuex";

import { api } from "@/api/api";
import { filterFirebaseKeys } from "@/utils/utils";
export default createStore({
  state: {
    allDiscussions: [],
  },
  getters: {
    fetchActiveDisccusion: (state) => (key) => {
      return state.allDiscussions.find((dsc) => dsc.key == key);
    },
  },
  mutations: {
    SendNewDiscussionToLocal(state, payload) {
      state.allDiscussions.push({
        subject: payload.discussionSubject,
        owner: localStorage.getItem("activeUser"),
        createdTime: payload.time,
        comments: [],
      });
    },
    fetchActiveDisccusion(state, payload) {
      const activeDsc = state.allDiscussions;
      console.log(activeDsc);
      console.log(payload);
    },
    deleteCommentOnLocal(state, payload) {
      let activeDiscussion = state.allDiscussions.find(
        (dsc) => dsc.key == payload.discussionKey
      );
      let vote = activeDiscussion.comments.findIndex(
        (comment) => comment.key == payload.commentKey
      );
      activeDiscussion.comments.splice(vote, 1);
    },
    addNewCommentToLocal(state, payload) {
      let activeDiscussion = state.allDiscussions.find(
        (dsc) => dsc.key == payload.discussionKey
      );
      activeDiscussion.comments.push(payload);
    },
    // updateActiveDisscussion(state , payload){

    // }
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
      let allDiscussionsData = data;
      allDiscussionsData = filterFirebaseKeys(data);
      allDiscussionsData = await allDiscussionsData.map((dc) => ({
        ...dc,
        comments: filterFirebaseKeys(dc.comments),
      }));
      allDiscussionsData.forEach((dsc) => {
        dsc.comments.forEach((comment) => {
          comment.vote = filterFirebaseKeys(comment.vote);
        });
      });
      state.allDiscussions = allDiscussionsData;
      console.log("data:", allDiscussionsData);
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
    async deleteComment({ state }, payload) {
      const [error, data] = await api({
        method: "delete",
        URL: `/${payload.discussionKey}/comments/${payload.commentKey}.json`,
      });
      console.log(payload);
      console.log(data);
      console.log(state);
      return error;
    },
    async sendNewComment({ state }, payload) {
      const [err, data] = await api({
        method: "post",
        URL: `/${payload.discussionKey}/comments.json`,
        body: payload,
      });
      console.log(state);
      console.log(data);
      return err;
    },
  },
  modules: {},
});
