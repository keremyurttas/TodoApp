<template>
  <router-view></router-view>
  <div
    v-if="getLoadingStatus"
    class="fixed top-0 right-0 w-screen h-screen flex items-center justify-center bg-gray-200 opacity-40"
  >
    <img src="./assets/loading-loading-forever.gif" class="w-20 h-20" alt="" />
  </div>
</template>
<script>
export default {
  computed: {
    getLoadingStatus() {
      return this.$store.getters.getLoadingStatus;
    },
  },
};
</script>

<style lang="scss"></style>
