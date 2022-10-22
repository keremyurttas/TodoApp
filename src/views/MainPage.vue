<template>
  <div class="flex flex-col items-center justify-between h-screen">
    <delete-area-app></delete-area-app>

    <progress-bar-app></progress-bar-app>

    <todo-app></todo-app>
    <create-todo-app></create-todo-app>
    <completed-todos-app></completed-todos-app>
  </div>
</template>
<script>
import TodoApp from "../components/TodoApp.vue";
import ProgressBarApp from "../components/ProgressBarApp";
import DeleteAreaApp from "../components/DeleteAreaApp";
import CreateTodoApp from "../components/CreateTodoApp";
import CompletedTodosApp from "../components/CompletedTodosApp";

export default {
  created() {
    this.$store.dispatch("fetchData").then(() => {
      this.$store.state.loadingStatus = false;
    });
  },
  components: {
    TodoApp,
    ProgressBarApp,
    CreateTodoApp,
    DeleteAreaApp,
    CompletedTodosApp,
  },
};
</script>
<style>
*,
*::after,
*::before {
  -webkit-user-select: none;
}
</style>
