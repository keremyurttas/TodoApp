<template>
  <div class="w-3/5 h-full">
    <div class="flex flex-col w-full bg-slate-200 p-4 rounded-xl">
      <h2 class="text-xl mb-6 text-center">Your Todos</h2>
      <ul
        v-if="fetchAllUncompletedTodos"
        class="overflow-auto h-96"
        @dragenter.prevent
        @dragover.prevent
        @drop="onDrop($event)"
        dropzone="true"
        id="container"
      >
        <todo-component
          id="sa"
          :key="index"
          v-for="(item, index) in fetchAllUncompletedTodos"
          :info="item"
          @dragstart="startDrag($event, item)"
        ></todo-component>
      </ul>
      <div
        v-if="!getBarValue && !fetchAllUncompletedTodos"
        class="h-96 flex items-center justify-between flex-col p-2"
        @dragenter.prevent
        @dragover.prevent
        @drop="onDrop($event)"
        dropzone="true"
      >
        <div class="flex flex-col items-center justify-center">
          <img
            src="../assets/sad-face-svgrepo-com.svg"
            class="w-24 h-24 opacity-50"
            alt=""
            draggable="false"
          />
          <span draggable="false" class="opacity-50 text-lg mt-4"
            >There is no Todo created yet.</span
          >
        </div>
        <img
          src="../assets/down-arrow-going-down.gif"
          class="w-28 h-20"
          alt=""
          draggable="false"
        />
      </div>
      <div
        v-if="getBarValue && !fetchAllUncompletedTodos"
        class="h-96 flex items-center justify-center flex-col p-2"
        @dragenter.prevent
        @dragover.prevent
        @drop="onDrop($event)"
        dropzone="true"
      >
        <img
          src="../assets/smile-face-svgrepo-com.svg"
          class="w-24 h-24 opacity-50"
          alt=""
          draggable="false"
        />
        <span draggable="false" class="opacity-50 text-lg mt-4"
          >All Todos are completed.</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import todoComponent from "./TodoComponent.vue";
import { startDrag } from "@/utils/utils";
export default {
  components: { todoComponent },
  data() {
    return {};
  },
  methods: {
    // onDrop(event, list) {
    //   console.log({ event });
    //   console.log({ list });
    // },
    onDrop(event) {
      const itemId = event.dataTransfer.getData("todoId");
      const item = this.$store.state.todos.find((item) => item.key == itemId);

      if (item.completed == true) {
        this.$store.dispatch("uncompletedTodo", item);
      }
    },
    startDrag(event, item) {
      startDrag(event, item);
    },
    // testDragOver(event) {
    //   let allYPositions = [];
    //   let todos = document.querySelectorAll("#sa");
    //   document.getElementById("container").insertBefore(todos[0], todos[2]);
    //   todos.forEach((todo) =>
    //     allYPositions.push({ todo: todo.getBoundingClientRect().top })
    //   );
    //   console.log(event);
    // },
  },
  computed: {
    fetchAllUncompletedTodos() {
      return this.$store.getters.fetchAllUncompletedTodos;
    },
    getBarValue() {
      return this.$store.getters.getBarValue;
    },
    // getTodos() {
    //   console.log(this.$store.state.todos);
    //   return this.$store.state.todos;
    // },
  },
};
</script>
