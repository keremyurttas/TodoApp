<template>
  <div class="w-screen flex items-center justify-center">
    <div class="group h-20 m-3">
      <button
        @click="newTodo"
        class="hover:rounded-none h-full rounded-xl px-4 bg-blue-400 text-gray-100"
      >
        New Todo!
      </button>
      <input
        v-model.trim="text"
        class="focus:inline-flex h-full group-hover:inline-block peer-required hidden bg-gray-300 w-2/4 px-4"
        type="text"
      />
    </div>
  </div>
</template>
<script>
import { getRandomHexCode } from "@/utils/utils";
export default {
  data() {
    return {
      text: null,
    };
  },
  methods: {
    newTodo() {
      if (this.text === "" || this.text == null) {
        alert("Empty todo");
      } else {
        this.$store.dispatch("newTodo", {
          text: this.text,
          completed: false,
          color: getRandomHexCode(),
          //for create random colors
          //"#"  +((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
        });
        this.text = "";
      }
    },
  },
};
</script>
