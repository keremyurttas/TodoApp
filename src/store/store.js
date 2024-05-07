import { createStore } from "vuex";
import axios from "axios";
// import { api } from "@/api/api";
const BASE_URL =
  "https://todo-app-api-new-yusikerems-projects.vercel.app/todos";
// import { getRandomHexCode } from "@/utils/utils";

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
      console.log(state.todos);
      return uncompleteds;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setLoadingStatus(state, currVal) {
      state.loadingStatus = currVal;
    },
    newTodoLocal(state, payload) {
      state.todos.push(payload);
      console.log(state.todos);
      state.loadingStatus = false;
    },
    deleteTodoLocal(state, payload) {
      this.commit(
        "setTodos",
        state.todos.filter((todo) => todo._id !== payload)
      );
      this.commit("setLoadingStatus", false);
      // let todos = state.todos;
      // let index = todos.findIndex((todo) => todo.key == payload.key);
      // console.log(index);
      // todos.splice(index, 1);
      // console.log(todos);
      // state.todos = todos;
    },
    changeComplateStatusOfTodoLocal(state, payload) {
      const completedTodo = state.todos.find((todo) => todo._id == payload.id);
      console.log(completedTodo, payload);
      completedTodo.completed = payload.completeStatus;
      state.loadingStatus = false;
    },
    completeTodoLocal(state, payload) {
      const completedTodo = state.todos.find((todo) => todo._id == payload);
      completedTodo.completed = true;
      state.loadingStatus = false;
    },
    editTodoLocal(state, payload) {
      let editedTodo = state.todos.find((todo) => todo._id == payload.id);
      Object.assign(editedTodo, payload.changes);
      state.loadingStatus = false;
    },
    uncompleteTodoLocal(state, payload) {
      let uncompletedTodo = state.todos.find((todo) => todo.key == payload.key);
      uncompletedTodo.completed = false;
      state.loadingStatus = false;
    },
  },
  actions: {
    async fetchData() {
      this.commit("setLoadingStatus", true);
      try {
        const response = await axios.get(BASE_URL);
        const todos = response.data.todos; // Extracting todos array from the response
        this.commit("setTodos", todos); // Committing mutation to update state
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async newTodo(content, payload) {
      this.commit("setLoadingStatus", true);
      console.log(payload);
      await axios.post(BASE_URL, payload).then((data) => {
        console.log(data);
        let todo = payload;
        todo._id = data.data.post._id;
        this.commit("newTodoLocal", todo);
      });
    },
    async deleteTodo(context, payload) {
      this.commit("setLoadingStatus", true);
      await axios.delete(`${BASE_URL}/${payload}`).then(() => {
        this.commit("deleteTodoLocal", payload);
      });
      // state.loadingStatus = true;
      // const [error, data] = await api({
      //   method: "delete",
      //   URL: `${payload.key}.json`,
      // });
      // console.log(data);
      // console.log(state);
      // if (error) console.log(error);
    },
    async changeComplateStatusOfTodo(content, payload) {
      this.commit("setLoadingStatus", true);
      axios
        .put(`${BASE_URL}/${payload.id}`, {
          completed: payload.isCompleted,
        })
        .then(() => {
          this.commit("changeComplateStatusOfTodoLocal", {
            id: payload.id,
            completeStatus: payload.isCompleted,
          });
        });
    },
    // async completeTodo({ state }, payload) {
    //   this.commit("setLoadingStatus", true);
    //   axios
    //     .put(`${BASE_URL}/${payload}`, {
    //       completed: true,
    //     })
    //     .then((resp) => {
    //       this.commit("changeComplateStatusOfTodoLocal", {
    //         id: payload,
    //         completeStatus: true,
    //       });
    //       console.log(resp);
    //       console.log(state);
    //       console.log(payload);
    //     });
    //   // const [error, data] = await api({
    //   //   method: "put",
    //   //   URL: `${payload.key}.json`,
    //   // });
    //   // console.log(data);
    //   // console.log(state);
    //   // if (error);
    // },
    async editTodo({ state }, payload) {
      this.commit("setLoadingStatus", true);
      console.log("pload is", payload);
      axios.put(`${BASE_URL}/${payload.id}`, payload.changes).then(() => {
        console.log(state);
        console.log(payload);
        this.commit("editTodoLocal", payload);
      });
    },
    // async uncompletedTodo({ state }, payload) {
    //   state.loadingStatus = true;
    //   axios
    //     .put(
    //       `https://todoa-6e60d-default-rtdb.firebaseio.com/todos/${payload.key}.json`,
    //       {
    //         text: payload.newText,
    //         completed: false,
    //       }
    //     )
    //     .then(() => {
    //       console.log(state);
    //       console.log(payload);
    //       this.commit("uncompleteTodoLocal", payload);
    //     });
    // },
  },
});
