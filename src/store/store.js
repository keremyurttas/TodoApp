import { createStore } from "vuex";

import { api } from "@/api/api";
import { filterFirebaseKeys } from "@/utils/utils";
import axios from "axios";

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
        key: payload.key,
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
    newVoteLocal(state, payload) {
      console.log(state);
      console.log(payload);
      let activeDiscussion = state.allDiscussions.find(
        (dsc) => dsc.key == payload.discussionKey
      );
      let activeComment = activeDiscussion.comments.find(
        (comment) => comment.key == payload.commentKey
      );
      activeComment.vote.push({ vote: payload.email, key: payload.key });
    },
    deleteVoteLocal(state, payload) {
      let activeDiscussion = state.allDiscussions.find(
        (dsc) => dsc.key == payload.discussionKey
      );
      let activeComment = activeDiscussion.comments.find(
        (comment) => comment.key == payload.commentKey
      );
      let activeVoteIndex = activeComment.vote.findIndex(
        (vote) => vote.vote == payload.email
      );
      activeComment.vote.splice(activeVoteIndex, 1);
      console.log(state);
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
      payload.key = data.name;
      console.log(payload.key);
      this.commit("SendNewDiscussionToLocal", payload);
      console.log(state);
      console.log(data);
      return err;
    },
    async deleteComment({ state }, payload) {
      const [error, data] = await api({
        method: "delete",
        URL: `/${payload.discussionKey}/comments/${payload.commentKey}.json`,
      });
      this.commit("deleteCommentOnLocal", payload);
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
      payload.key = data.name;
      this.commit("addNewCommentToLocal", payload);
      console.log(data.name);
      return err;
    },
    async newVote({ state }, payload) {
      await axios
        .post(
          `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${payload.discussionKey}/comments/${payload.commentKey}/vote.json`,
          { vote: payload.email }
        )
        .then((resp) => {
          payload.key = resp.data.name;
          this.commit("newVoteLocal", { ...payload });
          console.log(state);
        });

      // const [error, data] = api({
      //   method: "post",
      //   URL: `/${payload.discussionKey}/comments/${payload.commentKey}/vote.json`,
      //   body: { vote: payload.email },
      // });
      // console.log(state);
      // console.log(data);
      // console.log(payload);
      // return error;
    },
    async deleteVote({ state }, payload) {
      let activeDiscussion = state.allDiscussions.find(
        (dsc) => dsc.key == payload.discussionKey
      );
      let activeComment = activeDiscussion.comments.find(
        (comment) => comment.key == payload.commentKey
      );
      console.log(payload.commentKey);
      let activeVote = activeComment.vote.find(
        (vote) => vote.vote == payload.email
      );
      console.log(activeVote);
      let voteKey = activeVote.key;

      await axios
        .delete(
          `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${payload.discussionKey}/comments/${payload.commentKey}/vote/${voteKey}.json`
        )
        .then((resp) => {
          this.commit("deleteVoteLocal", payload);
          console.log(resp);
          console.log(state);
        });
    },
  },
  modules: {},
});
