<template>
  <div class="">
    <li
      draggable="true"
      :style="{ backgroundColor: bgColorComp }"
      class="flex justify-between todo relative items-center mb-1 p-4 border-2 border-blue-100 cursor-move hover:rounded-xl hover:border-gray-400"
    >
      <input
        type="text"
        v-model.trim="newText"
        v-if="isEditing"
        class="w-3/4 bg-transparent border-2 border-gray-300"
      />

      <div v-if="isEditing" class="flex items-center justify-between ml-64">
        <input
          v-model="newColor"
          type="color"
          name=""
          class="w-8 appearance-none bg-gray-700 mr-4"
        />
        <div class="flex items-center">
          <button @click="editTodo" class="w-5 h-5 mr-6">
            <img src="../assets/Antu_arrow-right.svg.png" alt="" />
          </button>

          <button
            class="text-red-600 border-2 bg-gray-200 text-center px-1 right-4"
            @click="isEditing = false"
          >
            x
          </button>
        </div>
      </div>
      <span v-if="!isEditing"><span class="mr-2">•</span>{{ info.text }}</span>
      <div class="flex gap-x-3">
        <div v-if="!isEditing" class="">
          <button @click="isEditing = true" class="w-5 h-5 mr-2">
            <img src="../assets/edit-button.svg" alt="" />
          </button>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEditing: false,
      newText: this.info.text,
      newColor: this.info.color,
    };
  },
  props: ["info"],
  methods: {
    editTodo() {
      if (this.newText !== "" || this.info.color !== this.newColor) {
        let todoInfo = this.info;
        todoInfo.newColor = this.newColor;
        todoInfo.newText = this.newText;
        this.$store.dispatch("editTodo", todoInfo);
        this.isEditing = false;
      } else {
        alert("Edit input is empty.");
      }
    },
  },
  computed: {
    bgColorComp() {
      let color = "";
      if (this.info.completed == true)
        color = "rgb(34 197 94 / var(--tw-bg-opacity))";
      else if (this.info.completed == false) color = this.info.color;
      return color;
    },
  },
};
</script>
<style>
.todo {
  -webkit-user-select: default;
  -webkit-user-drag: default;
  -webkit-app-region: drag;
}
</style>
