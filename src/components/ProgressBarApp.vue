<template>
  <div class="w-screen flex justify-center mt-2 mb-2">
    <div class="border-2 w-3/4 p-1 text-center">
      <div
        v-if="getBarValue"
        :style="{ width: getBarValue + '%' }"
        draggable="false"
        class="p-2 bg-green-500 h-7 flex items-center justify-center transition-width transition-slowest duration-1000 ease"
      >
        {{ getBarValue }} %
      </div>

      <div
        v-if="!getBarValue"
        class="p-2 bg-gray-500 w-full h-7 flex items-center justify-center"
      >
        <span draggable="false" class="text-white"
          >You haven't finished any Todo!</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    getBarValue() {
      return this.$store.getters.getBarValue;
    },
  },
};
</script>
