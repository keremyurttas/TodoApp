<template>
  <div
    @dragenter.prevent
    @dragover.prevent
    @drop="onDrop($event)"
    dropzone="true"
    class="w-screen h-36 bg-gradient-to-t p-4 flex justify-center from-gray-200 to-red-400"
  >
    <img
      draggable="false"
      class="w-20 h-20 opacity-50"
      src="../assets/trash.svg"
      alt=""
    />
  </div>
</template>
<script>
export default {
  methods: {
    onDrop(event) {
      const itemId = event.dataTransfer.getData("todoId");

      const item = this.$store.state.todos.find((item) => item.key == itemId);
      this.$store.dispatch("deleteTodo", item);
    },
  },
};
</script>
