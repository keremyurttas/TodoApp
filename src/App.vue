<template>
  <header-component></header-component>
  <router-view class="pt-20"></router-view>
</template>
<script>
import headerComponent from "@/components/headerComponent.vue";
export default {
  async created() {
    await this.$store.dispatch("fetchData");
  },
  components: { headerComponent },
};
</script>

<style lang="scss"></style>
