<template>
  <div>
    <div class="py-3 sm:py-4 w-1/3 relative">
      <div class="space-x-4 h-52 flex flex-col space-y-8 w-96">
        <textarea
          v-model="comment.text"
          class="border w-96"
          cols="55"
          rows="5"
        ></textarea>

        <div class="flex">
          <button
            @click="sendCommentTest"
            class="bg-gray-200 w-32 h-12 relative right-0 text-sm m-auto"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { eventBus } from "../main";

export default {
  data() {
    return {
      comment: {
        date: this.formatDate(new Date()),
        owner: localStorage.getItem("activeUser"),
        text: "",
        vote: [],
        discussionKey: this.discussionId,
      },
      discussionKey: this.discussionId,
    };
  },
  props: ["discussionId"],
  methods: {
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
    async sendCommentTest() {
      if (this.comment.text.trim() != "") {
        this.$store.dispatch("sendNewComment", this.comment);
        this.$store.commit("addNewCommentToLocal", { ...this.comment });
        this.comment.text = "";
      } else alert("Text area can't be empty");
    },

    // sendComment() {
    //   this.$emit("sentCommand", this.data);

    //   if (this.text.trim() != "") {
    //     axios
    //       .post(
    //         `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${this.discussionId}/comments.json`,
    //         {
    //           date: this.formatDate(new Date()),
    //           owner: localStorage.getItem("activeUser"),
    //           text: this.text,
    //           vote: [],
    //         }
    //       )
    //       .then((response) => {
    //         console.log(response);
    //         // this.comment.text=this.text

    //         this.$emit("fetchData");
    //       });
    //     // console.log(this.text)
    //     // this.comment.text=this.text
    //     // this.$emit("newComment",this.comment);
    //   } else {
    //     alert("Input can not be blank");
    //   }
    //   // this.$http.post('https://userdata-c16bc.firebaseio.com/comment_list.json',{email:this.email,comment:this.data})
    //   // .then((response)=>{
    //   //   console.log(response)
    //   // })

    //   this.text = "";
    // },
  },
};
</script>
