<template>
  <div class="h-min flex flex-col mb-10">
    <button
      @click="isCreatePopupShowing = true"
      class="bg-gray-500 text-white p-4 m-auto"
    >
      Create New Discussion
    </button>
    <div class="w-full">
      <div
        class="bg-gray-500 text-white flex justify-between px-20 mt-10 py-2 h-20"
      >
        <div class="flex w-full text-lg items-center">
          Search a discussion :
          <input
            class="rounded-md w-10/12 h-full px-2 text-gray-500 bg-gray-100 ml-5"
            placeholder="Topic of the discussion"
            v-model="search"
            type="text"
          />
        </div>
      </div>
    </div>

    <form action="" class="mt-4 ml-8 border-gray-500 border w-48 p-1">
      Sort by:
      <select v-model="selected" name="cars" id="cars">
        <option value="alphabetically">alphabetically</option>
        <option value="interaction">interaction</option>
        <option value="owner">owner</option>
        <option value="newest">newest</option>
      </select>
    </form>

    <create-discussion-popup
      v-if="isCreatePopupShowing"
      @closePopup="isCreatePopupShowing = $event"
    >
    </create-discussion-popup>
    <button @click="test">test</button>
    <div class="flex justify-center flex-wrap items-center space-y-6">
      <discussion-sum-component
        v-for="(discussion, index) in searchFunction"
        :key="index"
        :discussionInfo="discussion"
      >
      </discussion-sum-component>
      <!-- <div :key="i"
        v-for="(discussion,i) in searchFunction">
        {{discussion}}
        
      </div> -->
    </div>
  </div>
</template>
<script>
import discussionSumComponent from "../components/discussionSumComponent";
import CreateDiscussionPopup from "../components/createDiscussionPopup.vue";

export default {
  components: {
    discussionSumComponent,
    CreateDiscussionPopup,
  },

  data() {
    return {
      allDiscussions: [],
      isCreatePopupShowing: false,
      selected: "interaction",
      search: "",
    };
  },
  computed: {
    sortedArrayFunc() {
      let sortedDiscussions = this.fetchDiscussions;

      if (this.selected == "alphabetically") {
        sortedDiscussions = sortedDiscussions.sort((a, b) => {
          let subjectA = a.subject.toLowerCase();
          let subjectB = b.subject.toLowerCase();
          return subjectA < subjectB ? -1 : subjectA > subjectB ? 1 : 0;
        });
      } else if (this.selected == "interaction") {
        sortedDiscussions.sort((a, b) =>
          a.comments.length < b.comments.length ? 1 : -1
        );
      } else if (this.selected == "newest") {
        sortedDiscussions.sort((a, b) => {
          let fa = a.createdTime,
            fb = b.createdTime;
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (this.selected == "owner") {
        let filteredArray = [];
        sortedDiscussions.forEach((discussion) => {
          if (discussion.owner == localStorage.getItem("activeUser")) {
            filteredArray.push(discussion);
          }
        });
        sortedDiscussions = filteredArray;

        // sortedDiscussions.filter((discussion)=>{
        //   let filteredDiscussion=[];
        //   if(discussion.owner==localStorage.getItem('activeUser')){
        //     filteredDiscussion.push(discussion)
        //   }
        //   sortedDiscussions=filteredDiscussion;
        // console.log(sortedDiscussions)
        // })
      }
      console.log(this.allDiscussions);
      return sortedDiscussions;
    },

    searchFunction() {
      let sortedDiscussions = this.sortedArrayFunc;
      sortedDiscussions = sortedDiscussions.filter((discussion) =>
        discussion.subject.toLowerCase().includes(this.search.toLowerCase())
      );
      console.log(sortedDiscussions);
      return sortedDiscussions;
    },
    fetchDiscussions() {
      return this.$store.state.allDiscussions;
    },
  },

  methods: {
    deleteDiscVote(key) {
      const index = this.allDiscussions.findIndex((d) => d.key === key);
      this.allDiscussions[index].comments.splice(index, 1);
      //
      // const [error, data] = api({method:'post',{IR},{askg})
      // newDisc.key = data
      // this.allDiscussions.push(newD)
    },
    test() {
      console.log(this.$store.state.allDiscussions);
      window.localStorage.setItem("sa", "eheee");
      console.log(window.localStorage.getItem("sa"));
    },

    // filterFirebaseKeys(data) {
    //   let arr = [];
    //   for (let key in data) {
    //     data[key].key = key;
    //     arr.push(data[key]);
    //   }
    //   return arr;
    // },
    // async testDsc() {
    //   let allDcs = [];
    //   const [error, data] = await api({ method: "get", URL: "/.json" });
    //   allDcs = await this.filterFirebaseKeys(data);
    //   //
    //   this.allDiscussions = await allDcs.map((dc) => ({
    //     ...dc,
    //     comments: this.filterFirebaseKeys(dc.comments),

    //   })
    //   );

    //   console.log(this.allDiscussions)
    //   if (error) return; // !!!!
    // },
    // async fetchDiscussions() {
    //   this.allDiscussions = [];
    //   await axios
    //     .get(
    //       "https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions.json"
    //     )
    //     .then((resp) => {
    //       let data = resp.data;
    //       console.log("Response from axios method: ", data);
    //       for (let key in data) {
    //         console.log(data[key]);
    //         if (!data[key]) {
    //           return;
    //         } else {
    //           data[key].discussionKey = key;
    //           let commentsCount;
    //           console.log(data[key].comments);
    //           data[key].comments == undefined
    //             ? (commentsCount = 0)
    //             : (commentsCount = Object.keys(data[key].comments).length);

    //           data[key].commentsCount = commentsCount;

    //           console.log(data[key]);
    //           // data[key].commentsCount = 0;
    //           // for (let comment in data[key].comments) {
    //           //   comment;
    //           //   data[key].commentsCount++;
    //           // }

    //           this.allDiscussions.push(data[key]);
    //           console.log(this.allDiscussions);
    //         }
    //       }
    //     });
    // },
  },
  created() {
    // console.log(this.$store.state.allDiscussions);
    // this.allDiscussions = this.$store.state.allDiscussions;
    // this.$store.commit("fetchActiveDisccusion", this.$route.params.id);
  },

  // eventBus.$on("data", (data) => {
  //   console.log("discussions");
  //   this.allDiscussions = data;
  // });
  // this.allDiscussions = JSON.parse(
  //   window.localStorage.getItem("allDiscussions")
  // );
  // eventBus.$on("updateDiscussionsPage", () => {
  //   this.allDiscussions = JSON.parse(
  //     window.localStorage.getItem("allDiscussions")
  //   );
  //   console.log(this.allDiscussions);
  // });
  // this.fetchDiscussions();
  // eventBus.$on("request",()=>{
  //   eventBus.$emit("allDiscussions",this.allDiscussions)
  // })
  // eventBus.$on("sendNewComment", (comment) => {
  //   this.allDiscussions.forEach((dc) => {
  //     if (dc.key == comment.key) {
  //       dc.comments.push(comment);
  //       eventBus.$emit("allDiscussions", this.allDiscussions);
  //     }
  //   });
  // });
};
</script>
