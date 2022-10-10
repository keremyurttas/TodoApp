<template>
  <div class="flex items-center flex-col w-screen">
    <div
      class="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 w-3/4 h-60"
    >
      <div class="mb-4 text-center text-md">The Discussion</div>
      <div>
        <div class="min-h-min text-xl mb-2 text break-words">
          {{ sortComments.subject }}
        </div>
        <div class="flex items-center space-x-4 flex-col border-t-2 mt-8">
          <p
            class="text-sm font-medium text-gray-900 truncate dark:text-white mt-2"
          >
            {{ sortComments.owner }}
          </p>
          <div
            @click="showMore = !showMore"
            class="text-md text-gray-500 dark:text-gray-400"
          >
            {{ sortComments.createdTime }}
          </div>
        </div>
      </div>
    </div>
    <div class="flow-root">
      <ul
        role="list"
        class="divide-y divide-gray-200 dark:divide-gray-700 mt-6"
      >
        <comment
          :key="index"
          v-for="(comment, index) in sortComments.comments"
          :data="comment"
        ></comment>
      </ul>
    </div>

    <add-comment :discussionId="discussionKey"></add-comment>
  </div>
</template>
<script>
import Comment from "../components/CommentComponent.vue";
import AddComment from "../components/AddComment.vue";
export default {
  components: {
    Comment,
    AddComment,
  },
  data() {
    return {
      discussion: [],
      discussionKey: this.$route.params.id,
    };
  },
  computed: {
    sortComments() {
      let allData = this.fetchActiveDisccusion;
      allData.comments = this.fetchActiveDisccusion.comments;
      allData.comments.sort((a, b) => (a.vote.length < b.vote.length ? 1 : -1));
      // sortedComments.forEach((comment) => {
      //   if (comment.vote == undefined) {
      //     comment.voteCount = 0;
      //   } else {
      //     comment.voteCount = Object.keys(comment.vote).length;
      //   }
      //   console.log(sortedComments);
      // });
      // sortedComments.forEach((comm) => {
      //   if (comm.vote === undefined) {
      //     comm.vote = [];
      //   }
      // });
      // console.log(Array.isArray(sortedComments.vote));
      // sortedComments = sortedComments.sort((a, b) =>
      //   Object.values(a.voteCount) < Object.values(b.voteCount) ? -1 : 1
      // );
      // sortedComments.forEach((comment) => {
      //   comment.discussionKey = this.discussionKey;
      // });
      // console.log(sortedComments);
      return allData;
    },
    fetchActiveDisccusion() {
      return this.$store.getters.fetchActiveDisccusion(this.discussionKey);
    },
  },

  methods: {
    // async fetchDataTest(){
    //   const [err, data] = await api({
    //     method: "get",
    //     URL: `/${this.discussionKey}.json`,
    //   });
    //   this.discussion.discussionId=this.$route.params.id
    //   this.discussion=data
    //   console.log(this.discussion)
    //   this.comments=this.filterFirebaseKeys(data.comments)
    //   console.log(this.comments)
    //   // this.discussion.comments.forEach(comment=>{
    //   //   this.comments.push(comment)
    //   //   console.log(this.comments)
    //   // })
    //   return err;
    // },
    // async fetchData(key) {
    //   await axios
    //     .get(
    //       `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${key}.json`
    //     )
    //     .then((resp) => {
    //       this.discussion.subject = resp.data.subject;
    //       this.discussion.createdTime = resp.data.createdTime;
    //       this.discussion.owner = resp.data.owner;
    //       this.comments = [];
    //       for (let key in resp.data.comments) {
    //         (resp.data.comments[key].commentKey = key),
    //           (resp.data.comments[key].discussionKey = this.$route.params.id),
    //           this.comments.push(resp.data.comments[key]);
    //       }
    //       this.discussion.discussionKey = this.$route.params.id;
    //       for (let key in this.comments.vote) {
    //         key;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // if (index > -1) {
    //   // only splice array when item is found
    //   this.comments.splice(index, 1); // 2nd parameter means remove one item only
    // }
  },

  created() {
    // this.$store.commit("fetchActiveDisccusion", this.$route.params.id);
    // this.discussion = this.$store.getters.fetchActiveDisccusion(
    //   this.$route.params.id
    // );
    // console.log(
    //   this.$store.getters.fetchActiveDisccusion(this.$route.params.id)
    // );
    // this.discussion = JSON.parse(
    //   window.localStorage.getItem("activeDiscussion")
    // );
    // eventBus.$on("updateDiscussionPage", () => {
    //   const index = JSON.parse(
    //     window.localStorage.getItem("allDiscussions")
    //   ).findIndex((d) => d.key === this.discussionKey);
    //   this.discussion = JSON.parse(
    //     window.localStorage.getItem("allDiscussions")
    //   )[index];
    // });
    // this.fetchDataTest()
    // eventBus.$on("sendNewComment",(comment)=>{
    //   this.comments.push(comment);
    // })
    // console.log(this.discussion.discussionId)
    // this.fetchData(this.$route.params.id);
    // this.discussion=[]
    // console.log(this.discussion)
    // eventBus.$emit("request")
    // let i =0
    // eventBus.$on("allDiscussions",(data)=>{
    //   i++
    //   data.forEach(ds=>{
    //     if(ds.key==this.discussionKey){
    //      this.discussion.push(ds)
    //     }
    //   })
    //   console.log(i)
    // })
  },
};
</script>
