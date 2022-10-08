<template>
  <div class="mt-3 w-screen flex items-center flex-col h-44">
    <div class="w-3/4 lg:flex h-96">
      <div
        class="border border-gray-400 lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal w-full"
      >
        <div class="mb-8">
          <p class="text-gray-700 text-lg p-2 truncate w-full">
            {{ discussionInfo.subject }}
          </p>
        </div>

        <div class="flex justify-between">
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{{ discussionInfo.owner }}</p>
            <p class="text-gray-600 leading-none mt-2">
              {{ discussionInfo.createdTime }}
            </p>
          </div>

          <span>Comments count : {{ discussionInfo.comments.length }}</span>
          <button
            @click="test"
            class="bg-gray-600 text-white p-2 rounded-md"
            tag="button"
          >
            View Full Discussion
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["discussionInfo"],

  methods: {
    test() {
      this.$router.push("/discussion/" + this.discussionInfo.key);

      window.localStorage.setItem(
        "activeDiscussion",
        JSON.stringify(this.discussionInfo)
      );
    },
  },
  computed: {
    // getVoteCount(){
    //   let voteCount=""
    //   if(Object.values(this.discussionInfo.comments)){
    //    voteCount  =Object.values(this.discussionInfo.comments).length
    //   }
    //   else if((Object.values(this.discussionInfo.comments))==null ||(Object.values(this.discussionInfo.comments))==undefined){
    //     voteCount="No comments"
    //   }
    //  return voteCount
    // }
    // getVoteCount(){
    //   let commentss;
    //   if(Object.values(this.discussionInfo.comments)){
    //     commentss= Object.values(this.discussionInfo.comments)
    //   }
    //   else{
    //     commentss="";
    //   }
    //   console.log(commentss)
    //   return true
    // }
    // getVoteCount() {
    //   let commentCount = 0;
    //   console.log(this.discussionInfo.commentsCount)
    //   for (let key in this.discussionInfo.comments) {
    //     key;
    //     commentCount++;
    //   }
    //   return commentCount;
    // },
    // created() {
  },
};
</script>
