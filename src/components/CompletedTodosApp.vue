<template>
  <div
    @dragenter.prevent
    @dragover.prevent
    dropzone="true"
    @drop="onDrop($event)"
    class="w-screen h-36 bg-gradient-to-t from-gray-200 p-4 flex flex-col items-center justify-center to-green-500"
    @click="showCompletedsPopup = true"
  >
    <img
      draggable="false"
      src="../assets/tick-svgrepo-com.svg"
      class="w-20 h-20 opacity-50"
      alt=""
    />
    <span class="opacity-50 text-lg">Click here to see completed todos!</span>
  </div>

  <div
    v-if="showCompletedsPopup"
    class="h-1/2 w-screen p-3 bg-slate-600 fixed bottom-0 flex justify-center items-center"
  >
    <button
      @click="showCompletedsPopup = false"
      class="absolute right-0 top-0 bg-slate-300 p-6 text-xl"
    >
      x
    </button>

    <ul
      v-if="showCompleteds"
      class="w-full h-full overflow-auto flex-wrap justify-center items-center flex"
    >
      <todo-component
        :key="index"
        v-for="(todo, index) in showCompleteds"
        :info="todo"
        @dragstart="startDrag($event, todo)"
        class="w-3/5 mb-2"
      ></todo-component>
    </ul>
    <div v-else class="text-white opacity-50 text-xl">
      There is no completed Todo.
    </div>

    <!-- <div
      :key="index"
      v-for="(todo, index) in showCompleteds"
      draggable="true"
      @dragstart="startDrag($event, todo)"
      class="justify-between items-center flex h-1/8 w-1/3 p-4 bg-green-600 m-4 text-white"
    >
      {{ todo.text }}
      <div class="">
        <button class="w-5 h-5 mr-2">
          <img src="../assets/edit-button.svg" alt="" />
        </button>
      </div>
    </div> -->
  </div>
</template>
<script>
import TodoComponent from "./TodoComponent.vue";
import { startDrag } from "@/utils/utils";
export default {
  components: { TodoComponent },
  data() {
    return {
      showCompletedsPopup: false,
    };
  },
  methods: {
    onDrop(event) {
      const itemId = event.dataTransfer.getData("todoId");
      const item = this.$store.state.todos.find((item) => item.key == itemId);
      this.$store.dispatch("completeTodo", item);
    },
    startDrag(event, item) {
      startDrag(event, item);
    },
  },
  computed: {
    showCompleteds() {
      return this.$store.getters.showCompleteds;
    },
  },
};
</script>
