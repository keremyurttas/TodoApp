<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ getUsers }}
  </div>
</template>
r
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  created() {
    this.$store.dispatch("fetchData");
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUserNames;
    },
  },
};
</script>
