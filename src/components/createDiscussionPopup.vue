<template>
  <div
    class="bg-black opacity-95 fixed z-20 w-screen h-screen flex justify-center"
  >
    <div
      class="bg-gray-500 text-white flex justify-between px-20 mt-64 py-2 w-1/2 h-1/5 relative p-48 rounded-lg"
    >
      <div class="flex w-full text-lg items-center p-4">
        Topic of the discussion :
        <input
          v-model="discussion.discussionSubject"
          placeholder="Start a discussion !"
          class="rounded-md w-10/12 h-full px-2 text-gray-500 bg-gray-100 ml-5"
          type="text"
        />
        <button
          @click="createNewDiscussion"
          class="bg-gray-100 text-gray-500 rounded-lg h-3/5 ml-4"
        >
          Create a discussion
        </button>
      </div>

      <button
        @click="closePopupFunc"
        class="bg-red-400 text-black rounded-lg absolute top-2 right-2 p-1"
      >
        x
      </button>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import { api } from "../api/api";
// import { eventBus } from "../main";
export default {
  data() {
    return {
      discussion: {
        discussionSubject: "",
        time: this.formatDate(new Date()),
      },
    };
  },
  computed: {},
  methods: {
    closePopupFunc() {
      this.$emit("closePopup", false);
    },
    async createNewDiscussion() {
      this.$store.dispatch("sendNewDiscussion", this.discussion);
      this.$emit("closePopup", false);
    },
    //   if (this.discussionSubject.trim() !== "") {
    //     const [err, data] = await api({
    //       method: "post",
    //       URL: `.json`,
    //       body: {
    //         subject: this.discussionSubject,
    //         owner: localStorage.getItem("activeUser"),
    //         createdTime: this.formatDate(new Date()),
    //         comments: [],
    //       },
    //     });
    //     this.discussion.key = data.name;
    //     this.$emit("closePopup", false);
    //     this.discussion.subject = this.discussionSubject;
    //     eventBus.$emit("newDiscussion", this.discussion);
    //     return err;

    //     // axios
    //     // .post(
    //     //   "https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions.json",
    //     //   {
    //     //     subject: this.discussionSubject,
    //     //     owner: localStorage.getItem("activeUser"),
    //     //     createdTime: this.formatDate(new Date()),
    //     //   }
    //     // )
    //     // .then(() => {
    //     //   this.$emit("closePopup", false);
    //     // });
    //   } else {
    //     alert("Textarea is empty");
    //   }
    //   this.discussionSubject = "";
    // },
    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },

    formatDate(date) {
      return (
        [
          this.padTo2Digits(date.getDate()),
          this.padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join("/") +
        " " +
        [
          this.padTo2Digits(date.getHours()),
          this.padTo2Digits(date.getMinutes()),
        ].join(":")
      );
    },
  },
  created() {
    console.log("created");
    // eventBus.$on("data", () => {
    //   console.log("createDiss");
    // });
    // eventBus.$on("newTest", () => {
    //   console.log("test");
    // });
  },
};
</script>
