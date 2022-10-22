import { createStore } from "vuex";
import axios from "axios";
import { api } from "@/api/api";
import { filterFirebaseKeys } from "@/utils/utils";

export default createStore({
  state: {
    todos: [],
    loadingStatus: false,
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
    getBarValue(state) {
      let allTodos = state.todos;
      let completedTodos = allTodos.filter((todo) => todo.completed == true);
      let progress = Math.floor(
        (completedTodos.length / allTodos.length) * 100
      );
      if (Number.isNaN(progress)) {
        progress = 0;
      }
      return progress;
    },
    showCompleteds(state) {
      let completeds = state.todos.filter((todo) => todo.completed == true);
      if (completeds.length == 0) completeds = false;
      return completeds;
    },
    fetchAllUncompletedTodos(state) {
      let uncompleteds = state.todos.filter((todo) => todo.completed == false);
      if (uncompleteds.length == 0) uncompleteds = false;
      return uncompleteds;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
  },
  mutations: {
    newTodoLocal(state, payload) {
      state.todos.push(payload);
      console.log(state.todos);
      state.loadingStatus = false;
    },
    deleteTodoLocal(state, payload) {
      let todos = state.todos;
      let index = todos.findIndex((todo) => todo.key == payload.key);
      console.log(index);
      todos.splice(index, 1);
      console.log(todos);
      state.todos = todos;
      state.loadingStatus = false;
    },
    completeTodoLocal(state, payload) {
      let completedTodo = state.todos.find((todo) => todo.key == payload.key);
      completedTodo.completed = true;
      state.loadingStatus = false;
    },
    editTodoLocal(state, payload) {
      let editedTodo = state.todos.find((todo) => todo.key == payload.key);
      editedTodo.text = payload.newText;
      editedTodo.color = payload.newColor;
      state.loadingStatus = false;
    },
    uncompleteTodoLocal(state, payload) {
      let uncompletedTodo = state.todos.find((todo) => todo.key == payload.key);
      uncompletedTodo.completed = false;
      state.loadingStatus = false;
    },
  },
  actions: {
    async fetchData({ state }) {
      state.loadingStatus = true;
      const [error, data] = await api({ method: "get", URL: "/.json" });
      // state.allDiscussions = data;

      console.log("data:", data);
      let todos = data;

      todos = filterFirebaseKeys(data);
      this.state.todos = todos;
      console.log(state);
      return error;
    },
    async newTodo({ state }, payload) {
      state.loadingStatus = true;
      await axios
        .post(
          "https://todoa-6e60d-default-rtdb.firebaseio.com/todos.json",
          payload
        )
        .then((data) => {
          console.log(data);
          let todo = payload;
          todo.key = data.data.name;
          console.log(todo);
          this.commit("newTodoLocal", todo);
        });

      // const [error, data] = await api({
      //   method: "post",
      //   URL: ".json",
      //   body: { sa: "payload" },
      // });

      console.log(state);
    },
    async deleteTodo({ state }, payload) {
      state.loadingStatus = true;
      const [error, data] = await api({
        method: "delete",
        URL: `${payload.key}.json`,
      });
      console.log(data);
      console.log(state);
      if (error) console.log(error);
      this.commit("deleteTodoLocal", payload);
    },
    async completeTodo({ state }, payload) {
      state.loadingStatus = true;
      axios
        .put(
          `https://todoa-6e60d-default-rtdb.firebaseio.com/todos/${payload.key}.json`,
          {
            text: payload.text,
            completed: true,
          }
        )
        .then((resp) => {
          this.commit("completeTodoLocal", payload);
          console.log(resp);
          console.log(state);
          console.log(payload);
        });
      // const [error, data] = await api({
      //   method: "put",
      //   URL: `${payload.key}.json`,
      // });
      // console.log(data);
      // console.log(state);
      // if (error);
    },
    async editTodo({ state }, payload) {
      state.loadingStatus = true;
      axios
        .put(
          `https://todoa-6e60d-default-rtdb.firebaseio.com/todos/${payload.key}.json`,
          {
            color: payload.newColor,
            text: payload.newText,
            completed: false,
          }
        )
        .then(() => {
          console.log(state);
          console.log(payload);
          this.commit("editTodoLocal", payload);
        });
    },
    async uncompletedTodo({ state }, payload) {
      state.loadingStatus = true;
      axios
        .put(
          `https://todoa-6e60d-default-rtdb.firebaseio.com/todos/${payload.key}.json`,
          {
            text: payload.newText,
            completed: false,
          }
        )
        .then(() => {
          console.log(state);
          console.log(payload);
          this.commit("uncompleteTodoLocal", payload);
        });
    },
  },
});
