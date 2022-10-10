<template>
  <div class="w-screen flex justify-center">
    <li class="py-3 sm:py-4 w-2/3">
      <div @click="test" class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            class="w-8 h-8 rounded-full"
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Neil image"
          />
        </div>
        <div class="flex-1 min-w-0 w-64">
          <p
            class="text-sm font-medium text-gray-900 truncate dark:text-white mt-2"
          >
            {{ data.owner }}
          </p>
          <transition name="moreComment">
            <div
              v-if="!showMore"
              @click="showMore = !showMore"
              class="text-sm text-gray-500 truncate dark:text-gray-400"
            >
              {{ data.text }}
            </div>
            <div
              v-else
              @click="showMore = !showMore"
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ data.text }}
            </div>
          </transition>
        </div>
        <div class="flex flex-col items-end mr-8">
          <button
            class="p-2 rounded border-solid text-center bg-gray-200 w-8"
            @click="deleteComment"
          >
            x
          </button>
          <span class="text-xs mt-2">
            {{ data.date }}
          </span>
        </div>
        <div class="flex flex-col h-16 justify-between items-center">
          <button @click="vote">
            <img
              class="w-6 h-6"
              :class="this.checkIsUserVoted ? 'bg-green-500  ' : 'bg-white'"
              src="../assets/up-arrow.svg"
              alt=""
            />
          </button>
          <div v-if="!isVoteLoading">{{ this.getVoteLength }}</div>
          <div v-else class="w-4 h-4">
            <img src="../assets/loader-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
// import axios from "axios";

export default {
  data() {
    return {
      showMore: false,
      currentUser: localStorage.getItem("activeUser"),
      isVoteLoading: false,
      commentInfo: {
        commentKey: this.data.key,
        discussionKey: this.data.discussionKey,
        email: localStorage.getItem("activeUser"),
      },
    };
  },

  props: ["data"],
  computed: {
    getVoteLength() {
      return this.data.vote.length;
    },
    checkIsUserVoted() {
      let emails = [];
      for (let key in this.data.vote) {
        emails.push(this.data.vote[key].vote);
      }

      return emails.includes(this.currentUser);
    },
  },
  watch: {
    data(newV, old) {
      console.log(old);
      this.commentInfo = newV;
    },
  },
  methods: {
    test() {
      console.log(this.data);
    },
    async deleteComment() {
      if (this.data.owner === this.currentUser) {
        this.$store.dispatch("deleteComment", this.commentInfo);
      } else {
        alert("You can't delete different account's comment");
      }
    },

    async vote() {
      if (this.checkIsUserVoted) {
        this.isVoteLoading = true;
        console.log(this.commentInfo.commentKey);
        this.$store.dispatch("deleteVote", this.commentInfo);
        this.isVoteLoading = false;
        // const index = this.data.vote.findIndex(
        //   (d) => d.vote === this.currentUser
        // );

        // axios
        //   .delete(
        //     `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${this.data.discussionKey}/comments/${this.data.key}/vote/${this.data.vote[index].key}.json`
        //   )
        //   .then((resp) => {
        //     console.log(resp);
        //     this.isVoteLoading = false;
        //   });

        // eventBus.$emit("deleteVote", {
        //   vote: this.currentUser,
        //   commentKey: this.data.key,
        //   discussionKey: this.data.discussionKey,
        // });

        // console.log("datra", this.data);
        // const [error, data] = api({
        //   method: "delete",
        //   URL: `/${this.data.discussionKey}/comments/${this.data.key}/vote/${this.data.vote[index].key}.json`,
        // });
        // console.log("delete", data);
        // console.log(error)
        // this.$emit("deleteVote", {
        //   vote: this.currentUser,
        //   key: data.name,
        //   commentKey: this.data.key,
        // });
        // this.isVoteLoading = false;
        // return error;

        // for (let key in this.data.vote) {
        //   const activeKey = this.data.vote[key];
        //   if (activeKey.vote == this.currentUser) {
        //     const [error, data] = await api({
        //       method: "delete",
        //       URL: `/${this.data.discussionKey}/comments/${this.data.key}/vote/${key}.json`,
        //     });
        //     console.log(data);
        //     // await axios.delete(
        //     //   `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${this.data.discussionKey}/comments/${this.data.commentKey}/vote/${key}.json`
        //     // );
        //     //votenin keyini alıp eventbusla sil

        //     this.$emit("fetchData");
        //     // this.$eventbus.emit('deleteVote',voteKey)
        //     this.isVoteLoading = false;
        //     return error;
        //   }
        // }
      } else {
        this.isVoteLoading = true;
        console.log("commentkey:", this.commentInfo.commentKey);
        console.log(this.commentInfo);
        console.log("data is ", this.data);
        this.$store.dispatch("newVote", {
          commentKey: this.data.key,
          discussionKey: this.data.discussionKey,
          email: localStorage.getItem("activeUser"),
        });
        // const [error, data] = await api({
        //   method: "post",
        //   URL: `/${this.data.discussionKey}/comments/${this.data.key}/vote.json`,
        //   body: { vote: this.currentUser },
        // });
        // console.log(data);
        // eventBus.$emit("newVote", {
        //   vote: this.currentUser,
        //   key: data.name,
        //   commentKey: this.data.key,
        //   discussionKey: this.data.discussionKey,
        // });
        this.isVoteLoading = false;
        // return error;
      }
    },
  },
  created() {
    console.log(this.data);
    //   for (let key in this.data) {
    //       this.data[key].key = key;
    // }
  },
};
</script>
<style></style>
